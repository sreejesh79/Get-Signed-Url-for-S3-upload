const AWS = require('aws-sdk');
const fs = require('fs');
const s3 = new AWS.S3();
const expires = 60;

AWS.config.update({
  accessKeyId: process.env.AWS_S3_KEY,
  secretAccessKey: process.env.AWS_S3_SECRET,
  signatureVersion: "v4"
});

const getSignedUrl = async (event) => {
  const body = event.body;
  if (body && body.filename) {
    const bucketName = process.env.AWS_S3_BUCKET_NAME;
    const requestObj = {
      Bucket: bucketName,
      Key: body.filename,
      Expires: expires
   };
   const url = await s3.getSignedUrlPromise("putObject", requestObj);
   return { 'signedUrl': url };
  } else {
    return { 'message': 'filename missing in body' }
  }
}
exports.handler = getSignedUrl;



