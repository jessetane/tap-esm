# tap-esm
TAP for es modules

## Why
So you can write tests that will work in node and the browser without a build step.

## How
Minimal API coverage, very similar to node-tap and tape but does not attempt to be 100% drop-in compatible.

## Example
```javascript
import tap from 'tap-esm'

tap('this is a test', t => {
  t.plan(1)
  t.equal('a', 'b')
})

tap('this is an unplanned async tests that ends automatically', async t => {
  t.ok(true)
  t.notOk(false)
})
```

## API

### `t.plan(n)`
Declares that `n` assertions should be run. `t.end()` will be called automatically after the nth assertion. If there are any more assertions after the nth, or after `t.end()` is called, they will generate errors.

### `t.end()`
Declares the end of a test explicitly.

### `t.pass([message])`
Generates a passing assertion with optional message.

### `t.fail([message])`
Generates a failing assertion.

### `t.ok(value[, message])`
Asserts that `value` is truthy.

### `t.notOk(value[, message])`
Inverse of `t.ok()`.

### `t.equal(actual, expected[, message])`
Asserts that `actual` and `expected` are strictly equal.

### `t.notEqual(actual, expected[, message])`
Inverse of `t.equal()`.

### `t.arrayEqual(actual, expected[, message])`
Wraps `actual` and `expected` with `Array.from()` and then asserts the resulting lengths and all contained items are strictly equal. Note that this method does not recurse nested arrays.

### `t.notArrayEqual(actual, expected[, message])`
Inverse of `t.arrayEqual()`.

## Prior art
http://testanything.org/  
https://github.com/tapjs/node-tap  
https://github.com/substack/tape

## License
MIT

