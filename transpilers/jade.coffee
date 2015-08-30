Transpiler = require '../transpiler'
_ = require 'lodash'

class Jade extends Transpiler
  nodeParser: (node, indent = 0) =>
    return '' unless super node, indent

    output = ''

    # indent
    output += _.repeat ' ', indent

    # tag name
    output += node.name if node.name != 'div' || (!node.id && !node.classes?.length)

    # id
    output += "##{node.id}" if node.id

    # classes
    output += _.map(node.classes, (c) -> ".#{c}").join ''

    # attrs
    if node.attrs?.length
      output += '('
      _.each node.attrs, (attr, i) ->
        output += ', ' unless i == 0
        output += attr.name
        output += "=#{attr.value}" unless attr.value == null
      output += ')'

    # content
    output += " #{node.content.trim()}" if node.content && node.content.trim().length

    output += "\n"

    # children
    output += _.map(node.children, (childNode) =>
      @nodeParser childNode, indent + 2
    ).join ''

module.exports = Jade
