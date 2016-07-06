var fs = require('fs')
var path = require('path')

var transpilers = {}

var files = fs.readdirSync(path.join(__dirname, 'transpilers'))
files.forEach(function (file) {
  var basename = path.basename(file, path.extname(file))
  transpilers[basename] = new (require('./transpilers/' + basename))
})

module.exports = transpilers
