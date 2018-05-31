'use strict';

const AWS = require('aws-sdk');

module.exports.dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.paramTable = {
  TableName : process.env.DYNAMODB_TABLE || 'C3S-Clothes-Repo-dev'
};
