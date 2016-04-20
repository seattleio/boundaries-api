var request = require('request')
var base64 = require('base-64')

module.exports = function (config) {

  config = config || {}
  var host = config.url + ':' + config.port || 'http://127.0.0.1:3434/'
  var app = {}

  /*
   * GET all players
   */
  app.getBoundaries = function (options, callback) {
    request({
      url: host,
      // port: 
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, body)
    })
  },

  /*
   * GET a specific player
   */
  app.getQueriedBoundaries = function (options, callback) {
    request({
      url: host + '?long=-122.345002&lat=47.667044',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, body)
    })
  }

  return app

}
