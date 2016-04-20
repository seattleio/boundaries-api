var test = require('tape')
var config = require('../config')
var client = require('../client')(config)

/*
 * GET Players
 */
// Assume that we already have a superuser names USERNAME with password 'sodasoda'
test('get boundaries', function (t) {
  client.getBoundaries({}, function (err, res) {
    t.notOk(err)
    t.ok(res)
    console.log(err)
    console.log(res)
    t.end()
  })
})

test('get boundary with query filter', function (t) {
  client.getQueriedBoundaries({}, function (err, res) {
    t.notOk(err)
    t.ok(res)
    console.log(err)
    console.log(res)
    t.end()
  })
})

