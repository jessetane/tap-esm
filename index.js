class Tester {
  constructor (name, test) {
    this.name = name
    this.test = test
    this.planned = 0
    this.executed = 0
    this.complete = false
  }

  _next () {
    this.executed++
    if (this.planned !== 0) {
      if (this.executed >= this.planned) {
        this.end()
      }
    }
  }

  plan (n) {
    this.planned = n
  }

  end () {
    if (this.complete) {
      complete = true
      throw new Error('already complete')
    } else {
      this.complete = true
      setTimeout(run)
    }
  }


  pass (message = '(unnamed assert)') {
    pass(message)
    this._next()
  }

  fail (message = '(unnamed assert)') {
    fail(message, { operator: 'fail' })
    this._next()
  }

  ok (actual, message = 'should be truthy') {
    if (actual) {
      pass(message)
    } else {
      fail(message, {
        operator: 'ok',
        expected: true,
        actual
      })
    }
    this._next()
  }

  notOk (actual, message = 'should be falsy') {
    if (!actual) {
      pass(message)
    } else {
      fail(message, {
        operator: 'notOk',
        expected: false,
        actual
      })
    }
    this._next()
  }

  equal (expected, actual, message = 'should be strictly equal') {
    if (expected === actual) {
      pass(message)
    } else {
      fail(message, {
        operator: 'equal',
        expected,
        actual
      })
    }
    this._next()
  }

  notEqual (expected, actual, message = 'should not be strictly equal') {
    if (expected !== actual) {
      pass(message)
    } else {
      fail(message, {
        operator: 'notEqual',
        expected,
        actual
      })
    }
    this._next()
  }
}

function out () {
  if (tap.out) {
    var str = Array.from(arguments).join(' ')
    str += '\n'
    tap.out(str)
  } else {
    console.log.apply(console, arguments)
  }
}

function pass (message) {
  passed++
  out(`ok ${failed + passed} ${message}`)
}

function fail (message, info) {
  failed++
  out(`not ok ${failed + passed} ${message}`)
  out(`  ---`)
  out(`    operator: ${info.operator}`)
  if (info.hasOwnProperty('expected')) {
    out(`    expected: ${info.expected}`)
    out(`    actual: ${info.actual}`)
  }
  out(`  ...`)
}

function run () {
  if (complete) return
  var tester = testers.shift()
  if (tester) {
    if (passed === 0 && failed === 0) {
      out(`TAP version 13`)
    }
    out(`# ${tester.name}`)
    tester.test(tester)
  } else {
    complete = true
    var total = passed + failed
    out('')
    out(`1..${total}`)
    out(`# tests ${total}`)
    out(`# pass ${passed}`)
    if (failed === 0) {
      out('')
      out(`# ok`)
    } else {
      out(`# fail ${failed}`)
    }
    out('')
    var err = failed === 0 ? null : new Error('>= 1 test failed')
    if (tap.onFinish) {
      tap.onFinish(err)
    } else if (err) {
      throw err
    }
  }
}

function tap (name, test) {
  if (complete) throw new Error('already complete')
  var tester = new Tester(name, test)
  testers.push(tester)
  if (running) return
  running = true
  setTimeout(run)
}

var testers = []
var passed = 0
var failed = 0
var running = false
var complete = false

export default tap

