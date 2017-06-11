
# util-promisify

Node 8's [`require('util').promisify`](https://nodejs.org/api/util.html#util_util_promisify_original) as a node module to be used in all versions (needs to be verified).

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
