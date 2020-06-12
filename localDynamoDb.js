/* eslint-disable import/no-extraneous-dependencies */
const AWS = require('aws-sdk');

console.log('Creating local dynamoDB client...');

module.exports = new AWS.DynamoDB({
  apiVersion: 'latest',
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
});

/*
  "apiVersion": "2012-08-10",
  "accessKeyId": "abcde",
  "secretAccessKey": "abcde",
  "region":"us-west-2",
  "endpoint": "http://localhost:8000"
*/
