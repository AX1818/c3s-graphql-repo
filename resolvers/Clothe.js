'use strict';

const dynamoDb, { paramTable} = require('../services/dbclient');
const promisify = require('../services');

class Clothe {
  constructor(Id) {
    this.Id = id;
  }

  Tags() {
    const params = {
      ...paramTable,
      KeyConditions: {
        'Id': {
          ComparisonOperator: ' BEGINS_WITH',
          AttributeValueList: [`${this.Id}:`]
        }
      },
      QueryFilter: {
        'Type': {
          ComparisonOperator: 'EQ',
          AttributeValueList: ['CT']
        }
      }
    };

    console.log('dynammo params: ', JSON.stringify(params));
    return promisify(callback => dynamoDb.query(params, callback))
    .then(result => {
      console.log(result.Items); 
      return result.Items;
    });
  }
                                                  
}