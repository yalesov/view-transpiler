_ = require 'lodash'

class Transpiler
  compile: (tree) ->
    _.map(tree.nodes, @nodeParser).join('').trim()

  nodeParser: (node, indent = 0) ->
    return false if !node.name && !node.id && !node.classes.length
    node.name ||= 'div'

module.exports = Transpiler
