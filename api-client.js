var request = require('request')
var qs = require('qs')

module.exports = function (config) {
  config = config || {}
  config.url = config.url || 'http://127.0.0.1'
  config.port = config.port || '3434'
  var host = config.url + ':' + config.port
  var client = {}

  /*
   * GET the default boundary dataset at a specific lat/long
   */
  client.boundaries = function (options, callback) {
    request({
      url: host + '/boundaries?' + qs.stringify(options),
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }, function (err, res, body) {
      if (err) return callback(err)
      if (res.statusCode >= 400) return callback(body)
      return callback(null, res, body)
    })
  }

  return client
}
