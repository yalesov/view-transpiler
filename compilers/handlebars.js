module.exports = {
  compile: function (tree) {
    var result = '';
    var nodeParser = function (node, indent) {
      if (!node.name && !node.id && !node.classes.length) { return ''; }
      var output = '';
      if (typeof indent === 'undefined') {
        indent = 0;
      }
      for (var i = 0; i < indent; i++) {
        output += ' ';
      }
      output += '<' + node.name
      if (node.id) {
        output += ' id="' + node.id + '"';
      }
      if (node.classes.length) {
        output += ' class="'
        for (var i = 0; i < node.classes.length; i++) {
          output += node.classes[i];
          if (i < node.classes.length - 1) {
            output += ' ';
          }
        }
        output += '"';
      }
      output += '>' + "\n";
      if (node.content && node.content.trim().length > 0) {
        for (var i = 0; i < indent + 2; i++) {
          output += ' ';
        }
        output += node.content.trim() + "\n";
      }
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
