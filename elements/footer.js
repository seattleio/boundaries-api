var el = require('yo-yo')
var css = require('sheetify')

module.exports = function footer (state, send) {  
  var prefix = css`
    :host {
      width: 0 auto;
      padding: 0 10px;
      background-color: #f2f2f0;
      margin-top: 10px;
      height: 100px;
      bottom: 0;
      border-top: 2px solid #e2e2e0;
      text-align: center;
    }

    ul {
    list-style: none;
    // margin:0;
    // padding:0;
    }
    ul > li {
        display: inline-block;
        width: 100%;
    }
    ul > li > ul >li {
        color: black;
        font-size: 0.8em;
    }

    div {
        // width: 80%;
        // border: 1px solid black;
        -webkit-column-count:3;
        -moz-column-count:3;
        -ms-column-count:3;
        -o-column-count:3;
        column-count:3;
        -webkit-column-gap:5px;
        -moz-column-gap:5px;
        -ms-column-gap:5px;
        -o-column-gap:5px;
        column-gap:5px;
        columns:3;
    }
  `

  return el`<footer class="${prefix}">
    <div>
    <ul>
        <li>
            <ul>
                <li><a href='/'>US Census Tracts</a></li>
                <li><a href='/'>City Council Districts</a></li>
                <li><a href='/'>Neighborhoods</a></li>
                <li><a href='/'>Congressional Districts</a></li>
            </ul>
        </li>
        <li>
            <ul>
                <li><a href='/'>Police Department Beats</a></li>
                <li><a href='/'>Police Department Precints</a></li>
                <li><a href='/'>Police Department Policing Plans</a></li>
                <li><a href='/'>Residential Urban Villages</a></li>
            </ul>
        </li>
         <li>
            <ul>
                <li><a href='/'>Public Schools</a></li>
                <li><a href='/'>Zipcodes</a></li>
                <li><a href='/'>Zoning</a></li>
                <li><a href='/'>Parks</a></li>
            </ul>
        </li>
    </ul>
    </div>
  </footer>`
}
