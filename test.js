import tap from './index.js'

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
  //t.ok(3)
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
  complete = t
})

tap.onFinish = err => {
  // at least one test failed, so onFinish should be passed an error
  if (err.message !== '>= 1 test failed') throw new Error('tap.onFinish expected an error')
  // summary output
  var expected = `
1..7
# tests 7
# pass 6
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
  console.log('all tests passed')
}

var complete = null
var actual = ''
tap.out = function (str) {
  actual += str
}

function pass () {
  console.log(actual.slice(0, -1))
  actual = ''
}

function fail (name, expected) {
  console.log('expected:', expected)
  console.log('actual:', actual)
  throw new Error(name)
}

