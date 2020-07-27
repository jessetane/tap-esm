#!/usr/bin/env node

process.argv.slice(2).forEach(arg => {
  var prefix = arg.slice(0, 2) === './' ? '' : './'
  return import(prefix + arg)
})
