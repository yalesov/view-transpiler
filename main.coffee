fs = require 'fs'
path = require 'path'

transpilers = {}

files = fs.readdirSync path.join __dirname, 'transpilers'
files.forEach (file) ->
  basename = path.basename file, path.extname file
  transpilers[basename] = new (require "./transpilers/#{basename}")

module.exports = transpilers
