var test = require('tape')
var search = require('../elements/search')

test('create search field', function (t) {
  var stateinfo = {address: 'seattle, wa'}
  function createtesthandler (cmd, state) {
    console.log('callback fired')
  }

  var txt = search(stateinfo, createtesthandler)

  t.ok(txt, 'created field')
  t.equal(txt.tagName, 'NAV', 'nav container')
  t.equal(txt.childNodes[1].tagName, 'INPUT', 'input box')
  t.ok(txt.childNodes[1].oninput, 'input handler')
  t.ok(txt.childNodes[1].onsearch, 'search handler')
  t.equal('searchtextfield', txt.childNodes[1]._attributes.null.name.value, 'input field name')
  t.equal(stateinfo.address, txt.childNodes[1]._attributes.null.value.value, 'input field value')
  t.end()
})

