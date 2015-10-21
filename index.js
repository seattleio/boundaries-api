var fs = require('fs')
var url = require('url')
var http = require('http')
var router = require('router')()
var boundaries = require('seattle-boundaries')
var sendJSON = require('send-data/json')
var sendHTML = require('send-data/html')
var sendError = require('send-data/error')
var marked = require('marked')
var config = require('./config')

router.get('/', function (req, res) {
  fs.readFile('index.md', 'utf8', function (err, file) {
    if (err) return sendError(req, res, { body: err })
    var html = marked(file)
    sendHTML(req, res, {
      body: html,
      statusCode: 200
    })
  })
})

router.get('/boundaries', function (req, res) {
  var query = url.parse(req.url, true).query
  if (query && query.lat && query.long) {
    var matches = boundaries(query.long, query.lat)
    return sendJSON(req, res, matches)
  } else {
    return sendError(req, res, {
      body: new Error('lat and long query parameters are required')
    })
  }
})

http.createServer(function (req, res) {
  router(req, res, function () {
    sendError(req, res, {
      body: new Error('404')
    })
  })
}).listen(config.port)
