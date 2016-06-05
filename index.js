'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');

mongoose.Promise = Promise;

class Fixture {
  constructor() {
    this.models = {};
    this.elements = [];
  }

  create(items) {
    return Promise.resolve(items)
      .map(item => {
        if (!this.models[item.model]) {
          this.models[item.model] = mongoose.model(item.model);
        }

        const Model = this.models[item.model];
        const model = new Model(item.data);

        return model.save()
          .tap(user => {
            this[item.name] = user;
            this.elements.push(item.name);
          })
          .catch(e => console.error(e));
      });
  }

  drop() {
    return Promise.resolve(Object.keys(this.models))
      .each(name => this.models[name].collection.remove({}));
  }
}

module.exports = Fixture;
