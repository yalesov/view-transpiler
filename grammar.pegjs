{
  // current indent of the line being parsed
  var indent = 0;

  // string to be consumed and treated as a single indent token
  var indentToken;

  // parent node of current node being parsed
  var currentParentNode;
}

start =
  nodes:nodes?
  newline*
  { return { nodes: nodes }; }

nodes =
  firstNode:node
  nextNodes:(newline+ node:node { return node; })*
  { nextNodes.unshift(firstNode); return nextNodes; }

node =
  parent:parentNode children:(childNode)*
  {
    currentParentNode = parent.parent;
    delete parent.parent;
    delete parent._indent;
    parent.children = parent.children.concat(children);
    return parent;
  }
  /
  blankLine

parentNode =
  parent:nodeType {
    parent._indent = indent;
    if (!(parent.children instanceof Array)) {
      parent.children = [];
    }
    parent.parent = currentParentNode;
    return currentParentNode = parent;
  }

childNode =
  newline+
  childIndent:indents & {
    return childIndent === currentParentNode._indent + 1;
  }
  child:node
  { return child; }

nodeType =
  tag

tag =
  name:identifier?
  {
    return {
      name: name
    };
  }

// basic rules

identifier =
  firstChar: [a-zA-Z]
  nextChars: [a-zA-Z0-9_-]*
  { return firstChar + nextChars.join(''); }

blankLine =
  whitespace* & (newline)
  { return { type: 'blank_line' }; }

newline =
  newlineToken { indent = 0; }

newlineToken =
  "\r\n" / "\n" / "\r"

whitespace =
  [ \t] { /* do nothing */ }

indents =
  tabs: "\t"+ & {
    if (typeof indentToken === 'undefined') {
      indentToken = "\t";
    }
    return indentToken === "\t";
  }
  { return indent = tabs.length; }
  /
  spaces: ' '+ & {
    if (typeof indentToken === 'undefined') {
      indentToken = spaces.join('');
    }
    if (indentToken.charAt(0) !== ' ') {
      return false;
    } else {
      return spaces.length % indentToken.length === 0;
    }
  }
  { return indent = spaces.length / indentToken.length; }
