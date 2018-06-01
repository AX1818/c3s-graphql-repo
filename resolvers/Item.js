'use strict';

const { dynamoDb, paramTable } = require('../services/dbclient');
const { promisify } = require('../services');

module.exports = async function item(Id) {
  const params = {
    TableName: paramTable.TableName,
    KeyConditionExpression: 'Id = :Id',
    ExpressionAttributeValues: {
      ':Id': Id
    }
  };

  return await promisify(callback => dynamoDb.query(params, callback))
    .then(result => {
      return result.Items[0];
    });
}
