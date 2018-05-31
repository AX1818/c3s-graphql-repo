const {
  graphql,
  buildSchema
} = require('graphql');

const {schema} = require('../schema');
const {resolvers} = require('./index');

/*
test('test resolving clothes and its schema', ()=> {
  graphql(schema, `query { 
    clothes(Ids: ["20130301_131132", "DSC_0380"]) {
      Id
      Type
      Code
      State
      Timestamp
    }
  }`,
  resolvers).then(clothes => {
    console.log('clothes: ', JSON.stringify(clothes));
  });
});
*/

test('test get clothe by Id', ()=> {
  graphql(schema, `query { 
    clothe(Id: "20130301_131132") {
      Id
      Type
      Code
      State
      Timestamp
    }
  }`,
  resolvers).then(clothes => {
    console.log('Clothe: ', JSON.stringify(clothes));
  });
});

test('test get Tag by Id', ()=> {
  graphql(schema, `query { 
    tag(Id: "d76e41ac-677f-424c-b348-0cbacdf15dae") {
      Id
      Type
      Code
    }
  }`,
  resolvers).then(clothes => {
    console.log('Tag: ', JSON.stringify(clothes));
  });
});

test('test Tagging Clothe by Ids', ()=> {
  graphql(schema, `mutation { 
    tagClothes(tagId: "d76e41ac-677f-424c-b348-0cbacdf15dae", clotheIds: ["20130301_131132", "DSC_0380"]) {
      Id
      Type
      ClotheCode
      TagCode
    }
  }`,
  resolvers).then(clothes => {
    console.log('ClotheTags: ', JSON.stringify(clothes));
  });
});

/*
test('test adding Tag', ()=> {
  graphql(schema, `mutation { 
    addTag(Code: "T222") {
      Id
      Type
      Code
    }
  }`,
  resolvers).then(tag => {
    console.log('Tag: ', JSON.stringify(tag));
  });
});
*/