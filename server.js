var fs = require('fs')
var url = require('url')
var http = require('http')
var router = require('router')()
var boundaries = require('seattle-boundaries')
var sendJSON = require('send-data/json')
var sendHTML = require('send-data/html')
var sendError = require('send-data/error')
var marked = require('marked')
var topojson = require('topojson')
var config = require('./config')
var morgan = require('morgan')

router.use(morgan('common'))

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

router.get('/boundaries(\.:extension)?', function (req, res, next) {
  var query = url.parse(req.url, true).query
  query.long = query.long || query.lng || query.lon

  if (query && query.lat && query.long) {
    req.matches = boundaries(query.long, query.lat)
    next()
  } else {
    return sendError(req, res, {
      body: new Error('lat and long query parameters are required')
    })
  }
})

router.get('/boundaries(\.:extension)?', function (req, res, next) {
  var extension = req.params.extension || 'geojson'
  var handlers = {
    json: (matches) => sendJSON(req, res, matches),
    geojson: (matches) => sendJSON(req, res, matches),
    topojson: (matches) => sendJSON(req, res, topojson.topology({ collection: matches }))
  }
  var handler = handlers[extension]

  if (!handler) {
    return sendError(req, res, {
      body: new Error('unknown filetype requested: ' + extension)
    })
  }

  handler(req.matches)
})

http.createServer(function (req, res) {
  router(req, res, function () {
    sendError(req, res, {
      body: new Error('404')
    })
  })
}).listen(config.port)
