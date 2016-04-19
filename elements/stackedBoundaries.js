var el = require('yo-yo')
var css = require('sheetify')

module.exports = function stackedBoundaries (state, send) {  
  var prefix = css`
    :host {
      width:50%;
      background-color: #ffffff;
      position: fixed;
      top: 150px;
      margin: 0 auto;
      text-align: center;
  }

  h1 {
    font-size: 12px;
  }

  img {
    width: 15%;
    margin:0;
    padding:0;
  }

  hr {
    margin:0;
    border:0;
    height: 15px;
  }
  `
  return el`<div class="${prefix}">
    <img src='icon-person-128.png' />
    <div style='margin-top:-10px;'>
    <div width='15px'><hr style='margin-right:42.5%; margin-left:42.5%; background:black;'></div>
    <div width='25px'><hr style='margin-right:40%; margin-left:40%; background:green;'></div>
    <div width='30px'><hr style='margin-right:35%; margin-left:35%; background:red;'></div>
    <div width='50px'><hr style='margin-right:25%; margin-left:25%; background:blue;'></div>
    <div width='60px'><hr style='margin-right:20%; margin-left:20%; background:purple;'></div>
    <div width='80px'><hr style='margin-right:10%; margin-left:10%; background:yellow;'></div>
    <div width='100px'><hr style='margin-right:0%; margin-left:0%; background:brown;'></div>
    </div>
    </div>
  </div>`
}
