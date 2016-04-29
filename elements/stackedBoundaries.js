var el = require('yo-yo')
var css = require('sheetify')

module.exports = function stackedBoundaries (state, send) {  
  var prefix = css`
    :host {
      background-color: #ffffff;
      margin: 0 auto;
      text-align: center;
  }

  h1 {
    font-size: 12px;
  }

  img {
    width: 10%;
    margin:-5px 0;
    padding:0;
  }

  hr {
    margin:0;
    border:0;
    height: 15px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  `

  function onclick(e){
    var selectedBoundary = {name: 'nameid', show: false};
    send('stacked', {selectedBoundary: selectedBoundary});
  }

  function buildElem(items) {
    var largestBoundary = items[items.length-1].area;
    var smallestBoundary = items[0].area > 10 ? items[0].area : 10;
    var delta = (largestBoundary - smallestBoundary) / items.length;
    var width = smallestBoundary;
    // console.log('delta: ' + delta);
    return el`<div class="${prefix}">
              <img src="icon-person-128-cropped.png" />
              ${items.map(function(item){
                width += delta;
                var margin = (100 - width)/2;
                return el`<div width='${width}' onclick=${onclick}><hr style='margin:0 ${margin}%; background: ${item.color}' /></div>`
              })}
              </div>`
  }

  return buildElem(state.boundaries);
}
