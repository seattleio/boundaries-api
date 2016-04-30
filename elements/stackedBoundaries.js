var el = require('yo-yo')
var css = require('sheetify')

module.exports = function stackedBoundaries (state, send) {
  var prefix = css`
    :host {
      // background-color: #ffffff;
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
    var visible;
    if (this.dataset.stackedBoundaryVisible === 'true') {
      visible = false;
    } else {
      visible = true;
    }
    send('stacked', {selectedBoundary: {name: this.dataset.stackedBoundary, show: visible}});
  }

  function buildElem(items) {
    if (!items) return el`<div></div>`
    var largestBoundary = items[items.length-1].area;
    var smallestBoundary = items[0].area > 10 ? items[0].area : 10;
    var delta = 100 / items.length;
    var width = 10;
    console.log('delta: ' + delta);
    return el`<div class="${prefix}">
              <img src="icon-person-128-cropped.png" />
              ${items.map(function(item){
                console.log(item)
                width += delta;
                var margin = (100 - width)/2;
                return el`<div width='${width}' data-stacked-boundary='${item.properties.dataset}' data-stacked-boundary-visible='${item.visible}' onclick=${onclick}><hr style='margin:0 ${margin}%; background: ${item.color}' /></div>`
              })}
              </div>`
  }

  return buildElem(state.boundaries);
}
