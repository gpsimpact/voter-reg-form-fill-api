const AWS = require('aws-sdk');
const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
const fs = require('fs')
const path = require('path');


const file = `5a06c88d-cc94-4190-b726-d309b885a325.png`
console.log(file)
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
console.log(uploadParams);

s3.upload(uploadParams, (err, data) => {
  if (err) {
    console.log("Error", err);
  } if (data) {
    console.log("Upload Success", data.Location);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        filledForm: `https://voter-registration-forms.s3.amazonaws.com/${file}`
      }),
    };
    console.log(response)
    // callback(null, response);
  }
});
