# fixtures-mongoose

This module provide a way to load fixture data, a well known and fixed environment in which tests are run so that results are repeatable.

## Installation

```
npm install --save-dev fixtures-mongoose
```

## Examples

```javascript
const Chance = require('chance');
const Fixture = require('fixtures-mongoose');

const User = require('../../models').User;

const chance = new Chance();

const generateUser() => ({
  _id: new mongoose.Types.ObjectId(),
  firstname: chance.first(),
  lastname: chance.last(),
  password: chance.word({ length: options.passwordLength || 8 }),
});

describe('POST /templates', () => {
  const fixtures = new Fixture();

  before(() => {
    const user = generateUser();

    return fixtures.create([
      { name: 'admin', model: 'User', data: user }
    ]);
  });

  after(() => fixtures.drop());

  it('should be able to do something', done => {
    User.findOne().exec()
      .then(user => expect(user.firstname).to.equal(fixtures.admin.firstname))
      .asCallback(done);
  });
});
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/jspdown/fixtures-mongoose/tags).

## License

The library is distributed under the MIT License - if for some reason that doesn't work for you please get in touch.
