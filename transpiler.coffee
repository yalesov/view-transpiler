_ = require 'lodash'
fs = require 'fs'
parser = require './parser'

class Transpiler
  compile: (filepath) ->
    tree = parser.parse fs.readFileSync(filepath).toString()
    _.map(tree.nodes, @nodeParser).join('').trim()

  nodeParser: (node, indent = 0) ->
    return false if !node.name && !node.id && !node.classes.length
    node.name ||= 'div'

module.exports = Transpiler
