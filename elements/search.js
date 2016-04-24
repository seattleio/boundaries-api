var el = require('yo-yo')
var css = require('sheetify')

module.exports = function search (state, send) {  
  var navbar = css`
    input[type=search] {
      text-align: center;
      cursor: auto;
      width: 30%;
      text-shadow: none;
    }
  `
  var latitude = 0;
  var longitude = 0;
  function refreshaddress (e) {
    L.mapbox.accessToken = 'Your-Mapbox-Access-Token';
    var geocoder = L.mapbox.geocoder('mapbox.places');
    geocoder.query(e.target.value, callback);
    send('search', { address: e.target.value, lat: latitude, long: longitude });
  }

  function callback(err, data) {
    if (data.latlng) {
      latitude = data.latlng[0];
      longitude = data.latlng[1];
    }
  }

  return el`<nav class="${navbar}">
    <input type="search" results="5" name="searchtextfield" aria-label="Search"
           value="${state.address}"
           oninput=${refreshaddress}></input>
  </nav>`
}
