var _ = require('lodash')
var fs = require('fs')
var parser = require('./parser')

function Transpiler() {}

Transpiler.prototype.compile = function (filepath) {
  var tree = parser.parse(fs.readFileSync(filepath).toString())
  return _.map(tree.nodes, this.nodeParser.bind(this)).join('').trim()
}

Transpiler.prototype.nodeParser = function (node, indent) {
  if (!indent) indent = 0
  if (!node.name
    && !node.id
    && (!node.classes || !node.classes.length)
    && !node.comment
  ) return false
  if (!node.name) node.name = 'div'
  return true
}

module.exports = Transpiler
