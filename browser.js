var url = require('url')
var el = require('yo-yo')
var css = require('sheetify')
var history = require('sheet-router/history')
var sheetRouter = require('sheet-router')
var href = require('sheet-router/href')
var xtend = require('xtend')

var send = require('send-action')({
  onaction: onaction,
  onchange: onchange,
  state: {
    title: 'Seattle Boundaries',
    location: document.location.pathname
  }
})

css('./style.css', { global: true })

function sendLocation (href) {
  send('location', { location: url.parse(href).pathname })
}

href(sendLocation)
history(sendLocation)

/*
* Require the main elements of the app
*/
var header = require('./elements/header')

/*
* action handler that modifies state based on the actions triggered
*/
function onaction (action, state) {
  var type = action.type

  if (type === 'location') {
    return xtend(state, { location: action.location })
  }

  return state
}

/*
* Subscribe to changes to the store for rendering & logging
*/
function onchange (action, state, oldState) {
  console.log(action.type, action, state)

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
  return el`<div id="app">
    ${header(state, send)}
  </div>`
}
