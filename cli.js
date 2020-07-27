#!/usr/bin/env node

process.argv.slice(2).forEach(arg => {
  var first = arg[0]
  var prefix = first === '.' || first === '/' ? '' : process.cwd() + '/'
  return import(prefix + arg)
})
