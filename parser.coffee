pegjs = require 'pegjs'
fs = require 'fs'
path = require 'path'
grammar = fs.readFileSync(path.join __dirname ,'grammar.pegjs').toString()
parser = pegjs.buildParser grammar

module.exports = parser
