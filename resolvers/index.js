'use strict';

const uuidv4 = require('uuid/v4');

const Clothe = require('./Clothe');
const Tag = require('./Tag');

const { dynamoDb, paramTable } = require('../services/dbclient');
const { promisify } = require('../services');

module.exports.resolvers = {
  async clothes({ Ids }) {
    const params = {
      TableName: paramTable.TableName,
      ScanFilter: {
        'Type': {
          ComparisonOperator: 'EQ',
          AttributeValueList: 'C'
        },
        'Id': {
          ComparisonOperator: 'IN',
          AttributeValueList: Ids
        }
      }
    };

    return await promisify(callback => dynamoDb.scan(params, callback))
      .then( (result) => result.Items );
  },

  async clothesByDates({ dates }) {
    const [fromDate, toDate] = dates;
    console.log({ fromDate, toDate });
    const params = {
      TableName: paramTable.TableName,
      ScanFilter: {
        'Type': {
          ComparisonOperator: 'EQ',
          AttributeValueList: 'C'
        }
      }
    };

    if (fromDate && toDate) {
      Object.assign(params.ScanFilter, {
        'Timestamp': {
          ComparisonOperator: 'BETWEEN',
          AttributeValueList: [fromDate, toDate]
        }
      });
    } else if (fromDate) {
      Object.assign(params.ScanFilter, {
        'Timestamp': {
          ComparisonOperator: 'GE',
          AttributeValueList: [fromDate]
        }
      });
    } else if (toDate) {
      Object.assign(params.ScanFilter, {
        'Timestamp': {
          ComparisonOperator: 'LE',
          AttributeValueList: [toDate]
        }
      });
    }

    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    return await promisify(callback => dynamoDb.scan(params, callback))
      .then( (result) => result.Items );
  },

  async clothe({ Id }) {
    return new Clothe(Id);
  },

  async tag({ Id }) {
    return new Tag(Id);
  },

  addTag({ Code }) {
    const params = {
      TableName: paramTable.TableName,
      Item: {
        Id: uuidv4(),
        Type: 'T',
        Code
      }
    };

    return promisify(callback => dynamoDb.put(params, callback))
      .then(result => params.Item);
  },

  async tagClothes({ tagId, clotheIds }) {
    const clothes = await this.clothes({
      Ids: clotheIds
    });
    const tag = await this.tag({
      Id: tagId
    });
    const promises = clothes.map((clothe) => {
      const params = {
        TableName: paramTable.TableName,
        Item: {
          Id: `${clothe.Id}|${tagId}`,
          Type: 'CT',
          TagCode: tag.Code,
          ClotheCode: clothe.Code
        }
      };

      return promisify(callback => dynamoDb.put(params, callback))
        .then(result => params.Item);
    });

    return Promise.all(promises);
  },

  async updateClothe({ clothe }) {
    const { Id, Code, Timestamp, State } = clothe;
    const params = {
      TableName: paramTable.TableName,
      Key: { Id },
      AttributeUpdates: {
        'State': {
          Action: 'PUT',
          Value: State
        },
        'Code': {
          Action: 'PUT',
          Value: Code
        },
        'Timestamp': {
          Action: 'PUT',
          Value: Timestamp
        }
      },
      ReturnValues: 'UPDATED_OLD'
    };

    return promisify(callback => dynamoDb.update(params, callback))
      .then( () => this.clothe({ Id }) );
  },

  async updateTag({ tag }) {
    const { Id, Code } = tag;
    const params = {
      TableName: paramTable.TableName,
      Key: {
        Id
      },
      UpdateExpression: 'set Code = :newCode',
      ExpressionAttributeValues: {
        ':newCode': Code
      },
      ReturnValues: 'UPDATED_OLD'
    };

    return promisify(callback => dynamoDb.update(params, callback))
      .then( (tag) => this.tag({ Id }) );
  }

}