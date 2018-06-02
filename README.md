## Resources
### How to Make a Serverless GraphQL API using Lambda and DynamoDB
[How to Make a Serverless GraphQL API using Lambda and DynamoDB](https://serverless.com/blog/make-serverless-graphql-api-using-lambda-dynamodb/)

### DocumentClient API
[AWS.DynamoDB.DocumentClient](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)

### Local DynamoDB
[Setting Up DynamoDB Local](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)





### AWS Endpoints
- Dev: ***`https://oocl8wa668.execute-api.ap-southeast-2.amazonaws.com/dev/graphqlQuery`***

### Sample Tests

#### Query Tag by Id
```bash
curl -G 'https://oocl8wa668.execute-api.ap-southeast-2.amazonaws.com/dev/graphqlQuery' --data-urlencode 'query={tag(Id: "d76e41ac-677f-424c-b348-0cbacdf15dae") { Id Type Code } }'
```

#### Update Tag
```bash
curl -G 'https://oocl8wa668.execute-api.ap-southeast-2.amazonaws.com/dev/graphqlQuery' --data-urlencode 'query=mutation { updateTag(tag: {Id: "d76e41ac-677f-424c-b348-0cbacdf15dae", Code: "CELIA"}) { Id Type Code } }'
```

### Query Clothes By Dates
```bash
curl -G 'https://oocl8wa668.execute-api.ap-southeast-2.amazonaws.com/dev/graphqlQuery' --data-urlencode 'query={clothesByDates(dates: ["2018-01-1","2018-06-2"]) { Id Type Code State Timestamp} }'
```