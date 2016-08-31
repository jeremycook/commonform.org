var assert = require('assert')
var annotators = require('../annotators')
var find = require('array-find')
var html = require('yo-yo')

module.exports = function (state, send) {
  assert(typeof state === 'object')
  assert(typeof send === 'function')
  var flags = state.annotators
  return html`
    <section class=settings>
      <p>
        <form onchange=${onChange}>
          Annotate:
          ${Object.keys(flags).map(function (name) {
            return checkBox(
              find(annotators, function (annotator) {
                return annotator.name === name
              }),
              flags[name],
              send
            )
          })}
        </form>
      </p>
    </section>
  `
  function onChange (event) {
    event.stopPropagation()
    var target = event.target
    send('form:toggle annotator', {
      annotator: target.value,
      enabled: target.checked
    })
  }
}

function checkBox (annotator, enabled, send) {
  return html`
    <label>
      <input
          type=checkbox
          ${enabled ? 'checked' : ''}
          value=${annotator.name}/>
      ${annotator.summary}
    </label>
  `
}
