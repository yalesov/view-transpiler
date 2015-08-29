module.exports = {
  compile: function (tree) {
    var result = '';
    var nodeParser = function (node, indent) {
      if (!node.name && !node.id && !node.classes.length) { return ''; }
      var output = '';
      if (!node.name) {
        node.name = 'div';
      }
      if (typeof indent === 'undefined') {
        indent = 0;
      }
      for (var i = 0; i < indent; i++) {
        output += ' ';
      }
      if (node.name !== 'div' || (!node.id && !node.class)) {
        output += node.name
      }
      if (node.id) {
        output += '#' + node.id;
      }
      for (var i = 0; i < node.classes.length; i++) {
        output += '.' + node.classes[i];
      }
      if (node.content && node.content.trim().length > 0) {
        output += ' ' + node.content.trim();
      }
      output += "\n";
      node.children.forEach(function (childNode) {
        output += nodeParser(childNode, indent + 2);
      });
      return output;
    };
    tree.nodes.forEach(function (node) {
      result += nodeParser(node);
    });
    return result;
  }
};
