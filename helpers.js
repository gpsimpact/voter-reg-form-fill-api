const fs = require('fs')

const writeSignatureToFile = (dataUrl) => new Promise((resolve, reject) => {
  fs.writeFile("renderedSignature.png", dataUrl.replace(/^data:image\/png;base64,/, ""), 'base64', (err) => {
    if (err) reject(err);
    else resolve();
  });
})

const imArgsRef = {
  "00_citizen_yes": "-fill black -stroke black -draw 'rectangle 1060,279 1100,316'",
  "00_citizen_no": "-fill black -stroke black -draw 'rectangle 1266,279 1306,316'",
  "00_eighteenPlus_yes": "-fill black -stroke black -draw 'rectangle 1060,328 1100,368'",
  "00_eighteenPlus_no": "-fill black -stroke black -draw 'rectangle 1266,328 1306,368'",
  "01_prefix_mr": "-fill black -stroke black -draw 'rectangle 228,478 268,516'",
  "01_prefix_mrs": "-fill black -stroke black -draw 'rectangle 228,531 268,571'",
  "01_prefix_miss": "-fill black -stroke black -draw 'rectangle 384,478 424,516'",
  "01_prefix_ms": "-fill black -stroke black -draw 'rectangle 383,531 423,571'",
  "01_suffix_jr": "-fill black -stroke black -draw 'rectangle 2228,492 2258,522'",
  "01_suffix_sr": "-fill black -stroke black -draw 'rectangle 2228,545 2258,575'",
  "01_suffix_ii": "-fill black -stroke black -draw 'rectangle 2324,471 2354,501'",
  "01_suffix_iii": "-fill black -stroke black -draw 'rectangle 2324,512 2354,542'",
  "01_suffix_iv": "-fill black -stroke black -draw 'rectangle 2324,553 2354,583'",
  "01_firstName": "-pointsize 60 -gravity Northwest -annotate +1079+514 '%###%'",
  "01_lastName": "-pointsize 60 -gravity Northwest -annotate +541+514 '%###%'",
  "01_middleName": "-pointsize 60 -gravity Northwest -annotate +1652+514 '%###%'",
  "02_homeAddress": "-pointsize 60 -gravity Northwest -annotate +226+642 '%###%'",
  "02_aptLot": "-pointsize 60 -gravity Northwest -annotate +1152+642 '%###%'",
  "02_cityTown": "-pointsize 60 -gravity Northwest -annotate +1383+642 '%###%'",
  "02_state": "-pointsize 60 -gravity Northwest -annotate +1867+642 '%###%'",
  "02_zipCode": "-pointsize 60 -gravity Northwest -annotate +2173+642 '%###%'",
  "03_mailAddress": "-pointsize 60 -gravity Northwest -annotate +226+769 '%###%'",
  "03_cityTown": "-pointsize 60 -gravity Northwest -annotate +1383+769 '%###%'",
  "03_state": "-pointsize 60 -gravity Northwest -annotate +1867+769 '%###%'",
  "03_zipCode": "-pointsize 60 -gravity Northwest -annotate +2173+769 '%###%'",
  "04_dob": "-pointsize 60 -gravity Northwest -annotate +417+914 '%###%'",
  "05_telephone": "-pointsize 60 -gravity Northwest -annotate +844+973 '%###%'",
  "06_idNumber": "-pointsize 60 -gravity Northwest -annotate +1485+1053 '%###%'",
  "07_party": "-pointsize 60 -gravity Northwest -annotate +226+1133 '%###%'",
  "08_raceEthnic": "-pointsize 60 -gravity Northwest -annotate +847+1133 '%###%'",
  "09_month": "-pointsize 60 -gravity Northwest -annotate +1379+1480 '%###%'",
  "09_day": "-pointsize 60 -gravity Northwest -annotate +1619+1480 '%###%'",
  "09_year": "-pointsize 60 -gravity Northwest -annotate +1790+1480 '%###%'",
  "A_prefix_mr": "-fill black -stroke black -draw 'rectangle 226,1946 266,1986'",
  "A_prefix_mrs": "-fill black -stroke black -draw 'rectangle 226,1999 266,2039'",
  "A_prefix_miss": "-fill black -stroke black -draw 'rectangle 352,1946 392,1986'",
  "A_prefix_ms": "-fill black -stroke black -draw 'rectangle 351,1999 391,2039'",
  "A_suffix_jr": "-fill black -stroke black -draw 'rectangle 2229,1954 2259,1984'",
  "A_suffix_sr": "-fill black -stroke black -draw 'rectangle 2229,2007 2259,2037'",
  "A_suffix_ii": "-fill black -stroke black -draw 'rectangle 2320,1938 2350,1968'",
  "A_suffix_iii": "-fill black -stroke black -draw 'rectangle 2320,1978 2350,2008'",
  "A_suffix_iv": "-fill black -stroke black -draw 'rectangle 2320,2019 2350,2049'",
  "A_firstName": "-pointsize 60 -gravity Northwest -annotate +1246+1995 '%###%'",
  "A_middleName": "-pointsize 60 -gravity Northwest -annotate +1752+1995 '%###%'",
  "A_lastName": "-pointsize 60 -gravity Northwest -annotate +493+1995 '%###%'",
  "B_homeAddress": "-pointsize 60 -gravity Northwest -annotate +226+2200 '%###%'",
  "B_aptLot": "-pointsize 60 -gravity Northwest -annotate +1083+2200 '%###%'",
  "B_cityTown": "-pointsize 60 -gravity Northwest -annotate +1383+2200 '%###%'",
  "B_state": "-pointsize 60 -gravity Northwest -annotate +1851+2200 '%###%'",
  "B_zipCode": "-pointsize 60 -gravity Northwest -annotate +2174+2200 '%###%'",
  "D_helper": "-pointsize 60 -gravity Northwest -annotate +222+2940 '%###%'",
}

exports.imArgsRef = imArgsRef
exports.writeSignatureToFile = writeSignatureToFile