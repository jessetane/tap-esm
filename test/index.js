import tap from 'tap-esm'

tap('pass', t =>  {
  t.pass()
  t.end()
  var expected = `TAP version 13
# pass
ok 1 (unnamed assert)
`
  if (actual !== expected) fail('pass', expected)
  pass()
})

tap('fail', t => {
  t.plan(1)
  t.fail()
  var expected = `# fail
not ok 2 (unnamed assert)
  ---
    operator: fail
  ...
`
  if (actual !== expected) fail('fail', expected)
  pass()
})

tap('ok', t => {
  t.plan(2)
  t.ok(1)
  t.ok(2)
  var expected = `# ok
ok 3 should be truthy
ok 4 should be truthy
`
  if (actual !== expected) fail('ok', expected)
  pass()
})

tap('notOk', t => {
  t.plan(1)
  t.notOk(0)
  var expected = `# notOk
ok 5 should be falsy
`
  if (actual !== expected) fail('notOk', expected)
  pass()
})

tap('equal', t => {
  t.plan(1)
  t.equal('a', 'a')
  var expected = `# equal
ok 6 should be strictly equal
`
  if (actual !== expected) fail('equal', expected)
  pass()
})

tap('notEqual', t => {
  t.plan(1)
  t.notEqual('a', 'b')
  var expected = `# notEqual
ok 7 should not be strictly equal
`
  if (actual !== expected) fail('notEqual', expected)
  pass()
})

tap('arrayEqual', t => {
  t.plan(1)
  t.arrayEqual([1,2,3], new Uint8Array([1,2,3]))
  var expected = `# arrayEqual
ok 8 length and contents should be strictly equal
`
  if (actual !== expected) fail('arrayEqual', expected)
  pass()
})

tap('notArrayEqual', t => {
  t.plan(3)
  t.notArrayEqual([1,2,3], new Uint8Array([1,2,4]))
  t.notArrayEqual([1,2,3], new Uint8Array([1,2,3,4]))
  t.notArrayEqual([1,2,3,4], new Uint8Array([1,2,3]))
  var expected = `# notArrayEqual
ok 9 length or contents should not be strictly equal
ok 10 length or contents should not be strictly equal
ok 11 length or contents should not be strictly equal
`
  if (actual !== expected) fail('notArrayEqual', expected)
  pass()
})

tap('throws', t => {
  t.plan(2)
  t.throws(function () { throw new TypeError() }, 'should throw TypeError')
  t.throws(function () { throw new RangeError() }, RangeError)
  var expected = `# throws
ok 12 should throw TypeError
ok 13 should throw
`
  if (actual !== expected) fail('throws', expected)
  pass()
})

tap('doesNotThrow', t => {
  t.plan(1)
  t.doesNotThrow(function () {})
  var expected = `# doesNotThrow
ok 14 should not throw
`
  if (actual !== expected) fail('doesNotThrow', expected)
  pass()
  complete = t
})

tap('unplanned async', async t => {
  t.ok(1)
  t.ok(2)
  var expected = `# unplanned async
ok 15 should be truthy
ok 16 should be truthy
`
  if (actual !== expected) fail('unplanned async', expected)
  pass()
})

tap.onFinish = err => {
  // at least one test failed, so onFinish should be passed an error
  if (err.message !== '>= 1 test failed') throw new Error('tap.onFinish expected an error')
  // summary output
  var expected = `
1..16
# tests 16
# pass 15
# fail 1

`
  if (actual !== expected) fail('onFinish', expected)
  pass()
  // complete test should not be usable
  try {
    complete.pass()
    throw new Error(`complete test should not be usable`)
  } catch (err) {
    if (err.message !== 'already complete') throw err
  }
  // after all tests are complete tap should not be usable
  try {
    tap('test after end', t => t.pass())
    throw new Error('after all tests are complete tap should not be usable')
  } catch (err) {
    if (err.message !== 'already complete') throw err
  }
  log('all tests passed')
}

var complete = null
var actual = ''
tap.out = function (str) {
  actual += str
}

function pass () {
  log(actual.slice(0, -1))
  actual = ''
}

function fail (name, expected) {
  log('expected:', expected)
  log('actual:', actual)
  throw new Error(name)
}

function log () {
  if (typeof window !== 'undefined') {
    const line = document.createElement('div')
    line.innerText = Array.from(arguments).join(' ')
    document.body.appendChild(line)
  }
  console.log(...arguments)
}
