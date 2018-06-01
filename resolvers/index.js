'use strict';

const uuidv4 = require('uuid/v4');

const Clothe = require('./Clothe');
const Tag = require('./Tag');

const {
  dynamoDb,
  paramTable
} = require('../services/dbclient');
const {
  promisify
} = require('../services');

module.exports.resolvers = {
  async clothes({
    Ids
  }) {
    console.log('*****ids: ', Ids);
    Ids.sort();
    const minId = Ids[0];
    const maxId = Ids[Ids.length - 1];
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

    console.log('dynammo params: ', JSON.stringify(params));
    const cloeths = await promisify(callback => dynamoDb.scan(params, callback))
      .then(result => {
        console.log(result.Items);
        return result.Items;
      });
    return cloeths;
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
      .then(result => {
        console.log("result: ", result);
        return params.Item;
      });
  },

  async tagClothes({ tagId, clotheIds }) {
    const clothes = await this.clothes({
      Ids: clotheIds
    });
    console.log('fetched clothes: ', JSON.stringify(clothes, null, 2));
    const tag = await this.tag({ Id: tagId });
    console.log('fetched tag: ', JSON.stringify(tag, null, 2));
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

      console.log('params: ', JSON.stringify(params, null, 2));
      return promisify(callback => dynamoDb.put(params, callback))
        .then(result => {
          console.log(" params.Item: ", JSON.stringify( params.Item));
          return params.Item;
        });
    });
    return Promise.all(promises).then((results) => {
      console.debug('Param Items: ', JSON.stringify(results, null, 2));
      return results;
    });
  }

}
