var url = require('url')
var el = require('yo-yo')
var css = require('sheetify')
var history = require('sheet-router/history')
var sheetRouter = require('sheet-router')
var href = require('sheet-router/href')
var xtend = require('xtend')
var mapbox = require('mapbox')
var L = require('mapbox.js')
L.mapbox.accessToken = 'pk.eyJ1Ijoic2V0aHZpbmNlbnQiLCJhIjoiSXZZXzZnUSJ9.Nr_zKa-4Ztcmc1Ypl0k5nw'


var send = require('send-action')({
  onaction: onaction,
  onchange: onchange,
  state: {
    title: 'Seattle Boundaries',
    pathname: document.location.pathname,
    address: 'Search...',
    download: false,
    lat: 47.606,
    long: -122.332,
    selectedBoundary: {},
    boundaries: []
    map: undefined,
    mapLayer: L
  }
})

css('./style.css', { global: true })

function sendPathname (href) {
  send('pathname', { pathname: url.parse(href).pathname })
}

href(sendPathname)
history(sendPathname)

/*
* Require the main elements of the app
*/
var header = require('./elements/header')
var search = require('./elements/search')
var stackedBoundaries = require('./elements/stackedBoundaries')
var download = require('./elements/download')
var stackedMapApp = require('./elements/stackedMapApp')

/*
* action handler that modifies state based on the actions triggered
*/
function onaction (action, state) {
  var type = action.type
  console.log(type, state)

  if (type === 'pathname') {
    return xtend(state, { pathname: action.pathname })
  }

  if (type === 'download') {
    return xtend(state, { download: action.download })
  }

  if (type === 'search') {
    return xtend(state, { address: action.address, lat: action.lat, long: action.long })
  }

  if (type='stacked') {
    console.log(action.selectedBoundary);
    return xtend(state, {selectedBoundary: action.selectedBoundary})
  }

  return state
}

/*
* Subscribe to changes to the store for rendering & logging
*/
function onchange (action, state, oldState) {
  console.log(action.type, action, state)

  el.update(document.getElementById('app'), render(state))
}

/*
* Render the html of the app with yo-yo
*/
function render (state) {
  console.log('render')
  return app(state)
}

document.body.appendChild(render(send.state()))

/*
* Render the app
*/
function app (state) {
  return el`<div id="app">
    ${stackedMapApp(state, send)}
  </div>`
}
