var el = require('yo-yo')
var css = require('sheetify')
var mapbox = require('mapbox')

module.exports = function search (state, send) {  
  var navbar = css`
    input[type=search] {
      text-align: center;
      width: 100%;
      cursor: auto;
      text-shadow: none;
    }
  `

  var latitude = 0;
  var longitude = 0;
  function refreshaddress (e) {
//TODO last n results matching as user input
  }

  function callback(err, data) {
    if (data.latlng) {
      latitude = data.latlng[0];
      longitude = data.latlng[1];
    }
  }

  function onsearch (e) {
    if (e.target.value != '') {
      L.mapbox.accessToken = 'pk.eyJ1IjoicGF0dGVybnMiLCJhIjoiY2luOXhpM3l6MGZsNXYwa3ZiajJnMGs5aiJ9.BAZWHE9i1McCjuCSnuVUmw';
  ////    L.mapbox.accessToken = 'Your-Mapbox-Access-Token';
      var geocoder = L.mapbox.geocoder('mapbox.places');
      geocoder.query(e.target.value, callback);
      send('search', { address: e.target.value, lat: latitude, long: longitude });
    }
  }

  return el`<nav class="${navbar}">
    <input type="search" results="5" name="searchtextfield" aria-label="Search"
           value="${state.address}"
           oninput=${refreshaddress}
           onsearch=${onsearch}></input>
  </nav>`
}
