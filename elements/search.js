var el = require('yo-yo')
var css = require('sheetify')

module.exports = function search (state, send) {  
  var navbar = css`
    input[type=search] {
      text-align: center;
      cursor: auto;
      width: 30%;
      text-shadow: none;
      position: relative;
      top: 70px;
    }
  `

  return el`<nav class="${navbar}">
    <input type="search" results="5" name="searchtextfield" aria-label="Search" placeholder="${state.keywords}"></input>
  </nav>`
}
