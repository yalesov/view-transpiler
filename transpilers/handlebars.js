var Transpiler = require('../transpiler')
var _ = require('lodash')

function Handlebars() {
  Transpiler.apply(this, arguments)
  this.ext = 'hbs'
}

Handlebars.prototype = Object.create(Transpiler.prototype)
Handlebars.prototype.constructor = Handlebars

Handlebars.prototype.nodeParser = function (node, indent) {
  if (!indent) indent = 0

  if (!Transpiler.prototype.nodeParser.call(this, node, indent)) return ''

  var _this = this

  var output = ''

  // indent
  output += _.repeat(' ', indent)

  // comment open
  if (node.comment) output += node.display ? '<!-- ' : '{{! '

  // opening tag open
  if (!node.comment) output += '<'

  // tag name
  if (!node.comment) output += node.name

  // id
  if (node.id) output += ' id="' + node.id + '"'

  // classes
  if (node.classes && node.classes.length) {
    output += ' class="' + node.classes.join(' ') + '"'
  }

  // attrs
  if (node.attrs && node.attrs.length) {
    _.each(node.attrs, function (attr, i) {
      output += ' ' + attr.name
      if (attr.value !== null) output += '=' + attr.value
    })
  }

  // opening tag close
  if (!node.comment) output += ">\n"

  // content
  if (node.content && node.content.trim().length) {
    // add one more indent level
    if (!node.comment) output += _.repeat(' ', indent + 2)
    output += node.content.trim()
    if (!node.comment) output += "\n"
  }

  // children
  output += _.map(node.children, function (childNode) {
    return _this.nodeParser(childNode, indent + 2) + "\n"
  }).join('')

  // indent
  if (!node.comment) output += _.repeat(' ', indent)

  // closing tag
  if (!node.comment) output += '</' + node.name + '>'

  // comment close
  if (node.comment) output += node.display ? ' -->' : ' }}'

  return output
}

module.exports = Handlebars
