Transpiler = require '../transpiler'
_ = require 'lodash'

class Handlebars extends Transpiler
  nodeParser: (node, indent = 0) =>
    return '' unless super node, indent

    output = ''

    # indent
    output += _.repeat ' ', indent

    # opening tag open
    output += '<'

    # tag name
    output += node.name

    # id
    output += " id=\"#{node.id}\"" if node.id

    # classes
    output += " class=\"#{node.classes.join ' '}\"" if node.classes?.length

    # attrs
    if node.attrs?.length
      _.each node.attrs, (attr, i) ->
        output += ' '
        output += attr.name
        output += "=#{attr.value}" unless attr.value == null

    # opening tag close
    output += ">\n"

    # content
    if node.content && node.content.trim().length
      # add one more indent level
      output += _.repeat ' ', indent
      output += " #{node.content.trim()}\n"

    # children
    output += _.map(node.children, (childNode) =>
      "#{@nodeParser childNode, indent + 2}\n"
    ).join ''

    # indent
    output += _.repeat ' ', indent

    # closing tag
    output += "</#{node.name}>"

module.exports = Handlebars
