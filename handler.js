'use strict';

const {
  graphql,
  buildSchema
} = require('graphql');

const {schema} = require('./schema');
const {resolvers} = require('./resolvers');

module.exports.graphqlQuery = (event, context, callback) => {
  graphql(schema, event.queryStringParameters.query, resolvers).then(
    resp => callback(null, { statusCode: 200, body: JSON.stringify(resp) }),
    err => callback(err)
  );
};
