var axios = require('axios');
var fs = require('fs-extra');
var AWS = require("aws-sdk");
require('dotenv').config();

const s3region = process.env.AWS_S3_REGION;
const s3accessKeyId = process.env.AWS_KEY_ID;
const s3secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const s3bucket = process.env.AWS_S3_BUCKET;
const s3Folder = process.env.AWS_S3_FOLDER;
const runscriptKey = process.env.RUNSCRIPT_KEY;
const runscriptSecret = process.env.RUNSCRIPT_SECRET;

var inputFile = 'FD001_Business_Cards-1.idml';
var outputFile = 'FD001_Business_Cards-1.pdf';
var presetFile = 'DUKE Bleed.joboptions';
var presetPath = 'c:/Program Files/Adobe/Adobe InDesign CC Server 2019/Resources/Adobe PDF/settings/mul/DUKE Bleed.joboptions';
var s3KeyIndd = s3Folder + '/' + inputFile;
var s3KeyPdf = s3Folder + '/' + outputFile;
var s3KeyPreset = s3Folder + '/' + presetFile;


var s3 = new AWS.S3({ region: s3region, accessKeyId: s3accessKeyId, secretAccessKey: s3secretAccessKey});

runscript = async function(){
    var script = await fs.readFile('./test.jsx', 'utf8');

    // Arguments
    let args = [
      { name: 'First Name', value: 'Joe' },
      { name: 'Last Name', value: 'Bloggs' },
      { name: 'Qualification', value: 'Snr' },
      { name: 'Title', value: 'Engineer' },
      { name: 'ARN No.', value: 'AA 07 07 16 000000 1' },
      { name: 'Direct Phone', value: '+61 7 3444 4444' },
      { name: 'Phone', value: '+61 7 3444 4443' },
      { name: 'Email', value: 'jbloggs@fake.com' },
      { name: 'Fax', value: '+61 7 3444 4442' },
      { name: 'Address Line 1', value: '63 Fake St' },
      { name: 'Line 2', value: 'Unit 1' },
      { name: 'City', value: 'Maroocydore' },
      { name: 'State', value: 'QLD' },
      { name: 'Postcode', value: '4558' },
      { name: 'Post Box Address', value: 'PO Box 1033' },
      { name: 'Corporate', value: 'Faker' },
      { name: 'input', value: 'FD001_Business_Cards-1.idml'},
      { name: 'output', value: 'FD001_Business_Cards-1.pdf'},
      { name: 'preset_filename', value: presetPath},
      { name: 'preset_name', value: 'DUKE Bleed'},
      
  ]
  
    // Input files
    var inputFile1 = {};
    inputFile1.href = await s3.getSignedUrl('getObject', {Bucket: s3bucket, Key: s3KeyIndd});
    inputFile1.path = inputFile;

    var inputFile2 = {};
    inputFile2.href = await s3.getSignedUrl('getObject', {Bucket: s3bucket, Key: s3KeyPreset});
    inputFile2.path = presetPath;

    // Output files
    var outputFile1 = {};
    outputFile1.href = await s3.getSignedUrl('putObject', {Bucket: s3bucket, Key: s3KeyPdf, ContentType: 'application/octet-stream'});
    outputFile1.path = outputFile;

    

    // Request data
    var data = {
        inputs: [
            inputFile1,
            inputFile2,
        ],
        outputs: [
            outputFile1,
        ],
        args: args,
        script: script,
    };

    var auth = {username: runscriptKey, password: runscriptSecret};
    var url = 'https://runscript.typefi.com/api/v1/job?async=true'
    var response = await axios.post(url, data, {auth: auth});
    return response;
}

runscript()
.then(response => {
    console.log(response);
}).catch(err => {
    console.log(err);
});




