var pegjs = require('pegjs')
var fs = require('fs')
var path = require('path')
var grammar = fs.readFileSync(path.join(__dirname, 'grammar.pegjs')).toString()
var parser = pegjs.buildParser(grammar)

module.exports = parser
