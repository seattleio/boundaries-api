var el = require('yo-yo')
var css = require('sheetify')

module.exports = function header (state, send) {  
  var prefix = css`
    :host {
      background-color: #fafafa;
    }

    h1 {
      
    }
  `

  return el`<header class="${prefix}">
    <h1>${state.title}</h1>
  </header>`
}
