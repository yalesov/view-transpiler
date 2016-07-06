var Transpiler = require('../transpiler')
var _ = require('lodash')

function Jade() {
  Transpiler.apply(this, arguments)
  this.ext = 'jade'
}

Jade.prototype = Object.create(Transpiler.prototype)
Jade.prototype.constructor = Jade

Jade.prototype.nodeParser = function (node, indent) {
  if (!indent) indent = 0

  if (!Transpiler.prototype.nodeParser.call(this, node, indent)) return ''

  var _this = this

  var output = ''

  // indent
  output += _.repeat(' ', indent)

  // tag name
  if (node.name !== 'div' ||
    (!node.id && (!node.classes || !node.classes.length))) {
    output += node.name
  }

  // id
  if (node.id) output += '#' + node.id

  // classes
  output += _.map(node.classes, function (c) { return '.' + c }).join('')

  // attrs
  if (node.attrs && node.attrs.length) {
    output += '('
    _.each(node.attrs, function (attr, i) {
      if (i !== 0) output += ', '
      output += attr.name
      if (attr.value !== null) output += '=' + attr.value
    })
    output += ')'
  }

  // content
  if (node.content && node.content.trim().length) output += ' ' + node.content.trim()

  output += "\n"

  // children
  output += _.map(node.children, function (childNode) {
    return _this.nodeParser(childNode, indent + 2)
  }).join('')

  return output
}

module.exports = Jade
