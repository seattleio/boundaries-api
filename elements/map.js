var el = require('yo-yo')
var css = require('sheetify')

module.exports = function createMap (state, send) {
  var prefix = css`
    :host {
      width: 100%;
      min-height: 500px;
    }
  `
  var mapEl;
  var map;
  function init() {
    mapEl = el`<div id="map" class="${prefix}"></div>`
    map = state.mapLayer.mapbox.map(mapEl, 'mapbox.streets')
    state.mapLayer.marker([state.lat, state.long]).addTo(map);

    window.addEventListener('load', function () {
      map.setView([state.lat, state.long], 11, { reset: true })
    });
    state.map = map;
  }

  if (state.map === undefined) {
    init();
  } else {

    mapEl = document.getElementById('map');
    console.log("update map")
    state.map.setView([state.lat, state.long], 14)
  }

  return mapEl
}
