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
    state.marker = state.mapLayer.marker([state.lat, state.long])
    state.marker.addTo(map);

    window.addEventListener('load', function () {
      map.setView([state.lat, state.long], 11, { reset: true })
      if (state.matchingBoundaries) {
        state.mapLayer.geoJson(state.matchingBoundaries).addTo(state.map)
      }
    });
    state.map = map;
  }

  if (state.map === undefined) {
    init();
  } else {
    if (state.selectedBoundary) {
      state.mapLayer.geoJson(state.selectedBoundary).addTo(state.map)
    } else if (state.matchingBoundaries) {
      console.log('we have matching boundaries')
      state.mapLayer.geoJson(state.matchingBoundaries).addTo(state.map)
    }
    mapEl = document.getElementById('map');
    console.log("update map")
    state.marker.setLatLng([state.lat, state.long])
    state.map.setView([state.lat, state.long])
  }

  return mapEl
}
