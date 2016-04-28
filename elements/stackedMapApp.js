var el = require('yo-yo')
var css = require('sheetify')
var header = require('../elements/header')
var search = require('../elements/search')
var stackedBoundaries = require('../elements/stackedBoundaries')
var map = require('./map')

module.exports = function stackedMapApp (state, send) {
  var stackedMap = css`
    :host {
      background-color: #ffffff;
      margin: 0 auto;
      text-align: center;
  },
  div.stackedMapHeader {
    width: 100%;
  },
  div.stackedMapSearch {
    width: 80%;
    margin: 10px auto;
  },
  div.stackMapContainer {
    width: 80%;
    margin: 0 auto;
    position: relative;
    min-height: 300px;
    // border: 1px solid gray;
  },
  div.stackedMapStacks {
    position: absolute;
    bottom: 0;
    width: 49%;
    float: left;
    border:1px solid gray;
  },
  div.stackedMapMap {
    width: 49%;
    float: right;
    border: 1px solid gray;
    min-height: 300px;
  }
  `
  function buildApp() {
    return el`<div id="stackedMap" class="${stackedMap}">
      <div class="stackedMapHeader">${header(state, send)}</div>
      <div class="stackedMapSearch">${search(state, send)}</div>
      <div class="stackMapContainer">
        <div class="stackedMapStacks"><h3>Stack</h3>${stackedBoundaries(state, send)}</div>
        <div class="stackedMapMap">${map(state, send)}</div>
      </div>
    </div>`
  }

  
  return buildApp();
}
