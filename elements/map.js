var el = require('yo-yo')
var css = require('sheetify')
var L = require('mapbox.js')

module.exports = function createMap (state, send) {
  var prefix = css`
    :host {
      width: 100%;
      min-height: 300px;
    }
  `

  // TODO: make accessToken configurable
  L.mapbox.accessToken = 'pk.eyJ1Ijoic2V0aHZpbmNlbnQiLCJhIjoiSXZZXzZnUSJ9.Nr_zKa-4Ztcmc1Ypl0k5nw'
  var mapEl = el`<div id="map" class="${prefix}"></div>`
  var map = L.mapbox.map(mapEl, 'mapbox.streets')

  window.addEventListener('load', function () {
    map.setView([47.606, -122.332], 11, { reset: true })
  })
  console.log('panning: ' + state.lat + ',' + state.long);
  map.setView(new L.LatLng(state.lat, state.long), 11);

  return mapEl
}
