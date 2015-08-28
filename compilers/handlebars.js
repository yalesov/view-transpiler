module.exports = {
  compile: function (tree) {
    var result = '';
    var nodeParser = function (node, indent) {
      if (!node.name) { return ''; }
      var output = '';
      if (typeof indent === 'undefined') {
        indent = 0;
      }
      for (var i = 0; i < indent; i++) {
        output += ' ';
      }
      output += '<' + node.name + '>' + "\n";
      node.children.forEach(function (childNode) {
        output += nodeParser(childNode, indent + 2) + "\n";
      });
      for (var i = 0; i < indent; i++) {
        output += ' ';
      }
      output += '</' + node.name + '>';
      return output;
    };
    tree.nodes.forEach(function (node) {
      result += nodeParser(node);
    });
    return result;
  }
};
