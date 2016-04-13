var el = require('yo-yo')
var css = require('sheetify')

var send = require('send-action')({
  onaction: onaction,
  onchange: onchange,
  state: {}
})

/*
* action handler that modifies state based on the actions triggered
*/
function onaction (action, state) {
  return state
}

/*
* Subscribe to changes to the store for rendering & logging
*/
function onchange (action, state, oldState) {
  el.update(document.getElementById('app'), render(state))
}

/*
* Render the html of the app with yo-yo
*/
function render (state) {
  return app(state)
}

document.body.appendChild(render(send.state()))

/*
* Render the app
*/
function app (state) {
  return el`<div id="app">${state.value}</div>`
}
