var http = require('http')
var corsify = require('corsify')
var createApp = require('appa')
var boundaries = require('seattle-boundaries')
var topojson = require('topojson')
var config = require('./config')

var app = createApp()
var host = config.url + ':' + config.port
var cors = corsify({ 'Access-Control-Allow-Methods': 'GET' })
http.createServer(cors(app)).listen(config.port)

app.on('/', function (req, res, ctx) {
  app.send(res, { boundaries: host + '/boundaries' })
})

app.on('/boundaries', function (req, res, ctx) {
  var query = ctx.query
  var format = query.format || 'geojson'

  var matches = boundaries({
    long: query.long || query.lng || query.lon,
    lat: query.lat,
    dataset: query.dataset
  })

  if (format === 'topojson') {
    matches = topojson.topology({ collection: matches })
  }

  app.send(res, matches)
})
