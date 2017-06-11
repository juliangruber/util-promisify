
# util-promisify

Node 8's [`require('util').promisify`](https://nodejs.org/api/util.html#util_util_promisify_original) as a node module so you can use it now!

Currently supports Node versions 4-8.

[![build status](https://secure.travis-ci.org/juliangruber/util-promisify.svg)](http://travis-ci.org/juliangruber/util-promisify)
[![downloads](https://img.shields.io/npm/dm/util-promisify.svg)](https://www.npmjs.org/package/util-promisify)
[![Greenkeeper badge](https://badges.greenkeeper.io/juliangruber/util-promisify.svg)](https://greenkeeper.io/)

## Usage

```js
const promisify = require('util-promisify');
const fs = require('fs');

const stat = promisify(fs.stat)

stat('/tmp/').then(s => {
  // ...
})
```

## Installation

```bash
$ npm install util-promisify
```

## API

See `util.promisify`'s [API docs](https://nodejs.org/api/util.html#util_util_promisify_original).

### promifisy(original)
### (Symbol) promisify.custom
### (Symbol) promsifiy.customPromisifyArgs

## License

MIT
