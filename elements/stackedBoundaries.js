var el = require('yo-yo')
var css = require('sheetify')

module.exports = function stackedBoundaries (state, send) {  
  var data = [
    { area: 15, color: "black"},
    { area: 25, color: "green"},
    { area: 30, color: "red"},
    { area: 50, color: "blue"},
    { area: 60, color: "purple"},
    { area: 80, color: "yellow"},
    { area: 100, color: "brown"},
  ];

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

  function buildElem(items) {
    return el`<div class="${prefix}">
              <img src="icon-person-128-cropped.png" />
              ${items.map(function(item){
                var area = item.area;
                var margin = (100 - item.area)/2;
                return el`<div width='${area}'><hr style='margin:0 ${margin}%; background: ${item.color}' /></div>`
              })}
              </div>`
  }

  return buildElem(data);
}
