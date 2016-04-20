var el = require('yo-yo')
var css = require('sheetify')

module.exports = function header (state, send) {  
  var prefix = css`
    :host {
      width: 100%;
      background-color: #f2f2f0;
      padding: 10px 0px;
      height: 50px;
      top: 0;
      border-bottom: 1px solid #e2e2e0;
    }

    h1 {
      font-size: 20px;
      line-height: 1;
      margin: 5px 0px 0px 0px;
      display: inline-block;
    }
  `

  return el`<header class="${prefix}">
    <h1><a href="/">${state.title}</a></h1>
  </header>`
}
