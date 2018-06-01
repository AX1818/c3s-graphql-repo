'use strict';

const item = require('./Item');

class Tag {
  constructor(Id) {
    return item(Id).then((tag) => {
      Object.assign(this, tag);
      return this;
    });
  }
}

module.exports = Tag;
