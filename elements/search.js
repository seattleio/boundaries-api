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

  var addrpattern = '';
  function refreshaddress (e) {
//TODO last n results matching as user input
  }

  function callback(err, data) {
    if (data.latlng) {
      var latitude = data.latlng[0];
      var longitude = data.latlng[1];
      console.log('resp-lat: ' + latitude);
      console.log('resp-lng: ' + longitude);
      send('search', { address: addrpattern, lat: latitude, long: longitude });
    }
  }

  function onsearch (e) {
    if (e.target.value != '') {
      addrpattern = e.target.value;
      L.mapbox.accessToken = 'pk.eyJ1Ijoic2V0aHZpbmNlbnQiLCJhIjoiSXZZXzZnUSJ9.Nr_zKa-4Ztcmc1Ypl0k5nw';
      var geocoder = L.mapbox.geocoder('mapbox.places');
      geocoder.query(e.target.value, callback);
    }
  }

  return el`<nav class="${navbar}">
    <input type="search" results="5" name="searchtextfield" aria-label="Search"
           value="${state.address}"
           oninput=${refreshaddress}
           onsearch=${onsearch}></input>
  </nav>`
}
