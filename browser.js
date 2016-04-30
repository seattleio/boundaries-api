var url = require('url')
var el = require('yo-yo')
var css = require('sheetify')
var history = require('sheet-router/history')
var sheetRouter = require('sheet-router')
var href = require('sheet-router/href')
var xtend = require('xtend')
var L = require('mapbox.js')
L.mapbox.accessToken = 'pk.eyJ1Ijoic2V0aHZpbmNlbnQiLCJhIjoiSXZZXzZnUSJ9.Nr_zKa-4Ztcmc1Ypl0k5nw'
var api = require('./api-client')()

// for testing purpose
var boundaries = [
    {"name":"US Census Tracts", "color": "black", "area": 0, "polygon": [], visible: false},
    {"name":"City Council Districts", "color": "green", "area": 0, "polygon": [], visible: false},
    {"name":"Neighborhoods", "color": "red", "area": 0, "polygon": [], visible: false},
    {"name":"Congressional Districts", "color": "blue", "area": 0, "polygon": [], visible: false},
    {"name":"Parks", "color": "purple", "area": 0, "polygon": [], visible: false},
    {"name":"Police Department Beats", "color": "yellow", "area": 0, "polygon": [], visible: false},
    {"name":"Police Department Precints", "color": "brown", "area": 0, "polygon": [], visible: false},
    {"name":"Police Department Policing Plans", "color": "orange", "area": 0, "polygon": [], visible: false},
    {"name":"Residential Urban Villages", "color": "black", "area": 0, "polygon": [], visible: false},
    {"name":"Public Schools", "color": "black", "area": 0, "polygon": [], visible: false},
    {"name":"Zipcodes", "color": "black", "area": 0, "polygon": [], visible: false},
    {"name":"Zoning", "color": "black", "area": 0, "polygon": [], visible: false}
  ];

var rainbowColors = ["red", "#d13632", "#e2571e", "#ec883a", "#e69333", "#d6a525", "#cdb924", "#96bf33", "#479e1b", "green", "#1d828e", "#503fa9", "#8a2aa7", "#a8225f", "#c83964", "#d33264", "black"];

// randomly assign boundary area between 0 - 100
boundaries.forEach(function(element, index){
    element.area = Math.random() * 100;
});
// sort by area
boundaries.sort(function(a, b) {
  if (a.area > b.area) {
    return 1;
  }
  if (a.area < b.area) {
    return -1;
  }
  return 0;
});

// assign rainbow colors, rainbowColors.length > boundaries.length
boundaries.forEach(function(element, index){
  element.color = rainbowColors[index];
});
// end for testing purpose

api.boundaries({lat: 47.606,long:-122.332}, function (err, res, body) {
  send('boundaries:match', JSON.parse(body))
})

var send = require('send-action')({
  onaction: onaction,
  onchange: onchange,
  state: {
    title: 'Seattle Boundaries',
    pathname: document.location.pathname,
    address: '',
    download: false,
    lat: 47.606,
    long: -122.332,
    selectedBoundary: null,
    boundaries: boundaries,
    matchingBoundaries: null,
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

  if (type === 'stacked') {
    boundaries.forEach(function(boundary, index) {
      if (action.selectedBoundary.name === boundary.name){
        boundary.visible = action.selectedBoundary.show;
        return;
      }
    });
    // console.log(boundaries);
    return xtend(state, {selectedBoundary: action.selectedBoundary})
  }

  if (type === 'boundaries:match') {
    return xtend(state, { matchingBoundaries: action.matchingBoundaries })
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
