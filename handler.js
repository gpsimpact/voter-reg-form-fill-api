const map = require('lodash').map
const has = require('lodash').has
const fs = require('fs')
const path = require('path');
const exec = require('child_process').exec;
const uuid = require('uuid4');
// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// load helpers
const imArgsRef = require('./helpers').imArgsRef
const writeSignatureToFile = require('./helpers').writeSignatureToFile

module.exports.fillForm = (event, context, callback) => {

  //
  console.log("event received! ", event)

  const payload = JSON.parse(event.body)

  console.log("payload ", payload)

  // start list of args that will be combined into command to imageMagick
  const args = [
    "convert federal-voter-registration_1-25-16_english.png ",
  ]

  // process non-signature fields
  map(payload, (data, key) => {
    // if the key is in the imArgsRef, then add data and push to args

    if (has(imArgsRef, key) && key !== 'signature') {
      args.push(imArgsRef[key].replace("%###%", data))
      console.log(key, data, imArgsRef[key].replace("%###%", data))
    }
  })

  // Fill form with our without signature
  new Promise((resolve) => {
    // if signature is present it requries an extra render step
    if (has(payload, 'signature')) {
      // save signature image
      writeSignatureToFile(payload.signature)
        // now construct composite -geometry +1227+1237  signatureTest.png - signedForm.png
        .then(() => {
          args.push("miff:-")
          args.push("|")
          args.push("composite -geometry +1287+1267 /tmp/renderedSignature.png -")
          resolve()
        })
    } else {
      resolve()
    }

  })
    .then(() => {
      // generate uuid for file storage
      const id = uuid();
      const file = `/tmp/${id}.png`
      args.push(file)
      exec(args.join(' '), (error, stdout, stderr) => {
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null) {
          console.log(`exec error: ${error}`);
        }

        // call S3 to retrieve upload file to specified bucket
        const uploadParams = {
          Bucket: 'voter-registration-forms',
          Key: '',
          Body: ''
        };


        const fileStream = fs.createReadStream(file);
        fileStream.on('error', (err) => {
          console.log('File Error', err);
        });
        uploadParams.Body = fileStream;
        uploadParams.Key = path.basename(file);

        // Create S3 service object
        console.log("connecting to s3")
        const s3 = new AWS.S3({ apiVersion: '2006-03-01' });

        // call S3 to retrieve upload file to specified bucket
        console.log("uploading")
        s3.upload(uploadParams, (err, data) => {
          if (err) {
            console.log("Error", err);
          } if (data) {
            console.log("Upload Success", data.Location);
            const response = {
              statusCode: 200,
              body: JSON.stringify({
                filledForm: `https://voter-registration-forms.s3.amazonaws.com/${id}.png`
              }),
            };

            callback(null, response);
          }
        });
      });
    })

};
