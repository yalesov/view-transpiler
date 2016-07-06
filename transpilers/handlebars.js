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

  // opening tag open
  output += '<'

  // tag name
  output += node.name

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
  output += ">\n"

  // content
  if (node.content && node.content.trim().length) {
    // add one more indent level
    output += _.repeat(' ', indent)
    output += ' ' + node.content.trim() + "\n"
  }

  // children
  output += _.map(node.children, function (childNode) {
    return _this.nodeParser(childNode, indent + 2) + "\n"
  }).join('')

  // indent
  output += _.repeat(' ', indent)

  // closing tag
  output += '</' + node.name + '>'

  return output
}

module.exports = Handlebars
