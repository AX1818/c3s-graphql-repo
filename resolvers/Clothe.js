'use strict';

const { dynamoDb, paramTable } = require('../services/dbclient');
const { promisify } = require('../services');

const item = require('./Item');

// async function item(Id) {
//   const params = {
//     TableName: paramTable.TableName,
//     KeyConditionExpression: 'Id = :Id',
//     ExpressionAttributeValues: {
//       ':Id': Id
//     }
//   };

//   return await promisify(callback => dynamoDb.query(params, callback))
//     .then(result => {
//       return result.Items[0];
//     });
// }

class Clothe {
  constructor(Id) {
    this.Id = Id;
    return item(Id).then(clothe => {
      Object.assign(this, clothe);
      return this;
    });
  }

  ClotheTags() {
    const params = {
      ...paramTable,
      ScanFilter: {
        'Id': {
          ComparisonOperator: 'BEGINS_WITH',
          AttributeValueList: [`${this.Id}|`]
        },
        'Type': {
          ComparisonOperator: 'EQ',
          AttributeValueList: ['CT']
        }
      }
    };

    return promisify(callback => dynamoDb.scan(params, callback))
    .then(result => {
      return result.Items;
    });
  }                                              
}

module.exports = Clothe;