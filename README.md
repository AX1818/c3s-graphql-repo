
### AWS Endpoints
- Dev: ***`https://oocl8wa668.execute-api.ap-southeast-2.amazonaws.com/dev/graphqlQuery`***

### Sample Tests
```bash
curl -G 'https://oocl8wa668.execute-api.ap-southeast-2.amazonaws.com/dev/graphqlQuery' --data-urlencode 'query={tag(Id: "d76e41ac-677f-424c-b348-0cbacdf15dae") { Id Type Code } }'
```
