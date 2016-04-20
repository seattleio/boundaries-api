var el = require('yo-yo')
var css = require('sheetify')

/*
* Example of using the `send` function to modify state
*/

module.exports = function header (state, send) {  
  // var prefix = css``

  function onclick (e) {
    send('download', { download: true })
  }

  return el`<button onclick=${onclick}>Download the boundaries</button>`
}
