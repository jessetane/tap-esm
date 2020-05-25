# tap6
TAP for es6

## Why
So you can write tests that will work in node and the browser without a build step.

## How
Minimal API coverage, very similar to node-tap and tape but does not attempt to be 100% drop-in compatible.

## Example
```javascript
import tap from 'tap6/index.js'

tap('this is a test', t => {
  t.plan(1)
  t.equal('a', 'b')
})
```

## Prior art
http://testanything.org/
https://github.com/tapjs/node-tap
https://github.com/substack/tape

## License
MIT

