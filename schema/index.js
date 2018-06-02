'use strict';

const { graphql, buildSchema } = require('graphql');

module.exports.schema = buildSchema(` 
  enum ClotheType {
    C
  }

  enum TagType {
    T
  }

  enum ClotheTagType {
    CT
  }

  enum ClotheState {
    NEW
    AVAILABLE
    ONSALE
    SOLD
  }

  input ClotheInput {
    Id: String!
    Code: String
    Timestamp: String
    State: ClotheState!
  }

  input TagInput {
    Id: String!
    Code: String!
  }

  type Clothe {
    Id: String!
    Type: ClotheType!
    Code: String
    Timestamp: String!
    State: ClotheState!
    ClotheTags: [ClotheTag]
  }

  type Tag {
    Id: String!
    Type: TagType!
    Code: String!
  }

  type ClotheTag {
    Id: String!
    Type: ClotheTagType!
    ClotheCode: String!
    TagCode: String!
  }

  type Query {
    clothes(Ids: [String]): [Clothe]
    clothesByDates(dates: [String]): [Clothe]
    clothe(Id: String!): Clothe
    tag(Id: String!): Tag
  }

  type Mutation {
    addTag(Code: String!): Tag
    tagClothes(tagId: String!, clotheIds: [String!]): [ClotheTag]
    updateClothe(clothe: ClotheInput): Clothe
    updateTag(tag: TagInput): Tag
  }
`);
