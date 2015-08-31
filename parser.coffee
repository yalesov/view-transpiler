pegjs = require 'pegjs'
fs = require 'fs'
parser = pegjs.buildParser fs.readFileSync('./grammar.pegjs').toString()

module.exports = parser
