var test = require('tape')
var config = require('../config')
var client = require('../client')(config)

/*
 * Testing the API client here:
 */
// TODO: Assert these tests against a specific response result
// (we are currently only checking for errors)
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

