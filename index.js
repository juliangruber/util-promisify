'use strict';

const kCustomPromisifiedSymbol = Symbol('util.promisify.custom');
const kCustomPromisifyArgsSymbol = Symbol('customPromisifyArgs');

function promisify(orig) {
  if (typeof orig !== 'function') {
    //const errors = require('internal/errors');
    //throw new errors.TypeError('ERR_INVALID_ARG_TYPE', 'original', 'function');
    var err = TypeError(`The "original" argument must be of type function`);
    err.code = 'ERR_INVALID_ARG_TYPE';
    err.name = `TypeError [${err.code}]`;
    throw err
  }

  if (orig[kCustomPromisifiedSymbol]) {
    const fn = orig[kCustomPromisifiedSymbol];
    if (typeof fn !== 'function') {
      throw new TypeError('The [util.promisify.custom] property must be ' +
                          'a function');
    }
    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn, enumerable: false, writable: false, configurable: true
    });
    return fn;
  }

  // Names to create an object from in case the callback receives multiple
  // arguments, e.g. ['stdout', 'stderr'] for child_process.exec.
  const argumentNames = orig[kCustomPromisifyArgsSymbol];

  function fn(...args) {
    let resolve, reject;
    const promise = new Promise((_resolve, _reject) => {
      [resolve, reject] = [_resolve, _reject];
    });
    try {
      orig.call(this, ...args, (err, ...values) => {
        if (err) {
          reject(err);
        } else if (argumentNames !== undefined && values.length > 1) {
          const obj = {};
          for (var i = 0; i < argumentNames.length; i++)
            obj[argumentNames[i]] = values[i];
          resolve(obj);
        } else {
          resolve(values[0]);
        }
      });
    } catch (err) {
      reject(err);
    }
    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(orig));

  Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn, enumerable: false, writable: false, configurable: true
  });
  return Object.defineProperties(fn, Object.getOwnPropertyDescriptors(orig));
}

promisify.custom = kCustomPromisifiedSymbol;
promisify.customPromisifyArgs = kCustomPromisifyArgsSymbol;

module.exports = promisify;
