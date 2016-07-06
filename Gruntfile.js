module.exports = function (grunt) {
  var transpilers = require('./index')
  var fs = require('fs')
  var path = require('path')
  var async = require('async')

  grunt.registerMultiTask('transpiler', 'Transpile view templates', function() {
    var done = this.async()
    var _this = this

    var opts = this.options()
    var files = grunt.file.expandMmapping(opts.src, opts.dest, {
      cwd: opts.cwd,
      filter: grunt.file.isFile,
      rename: function (dest, src, opts) {
        var dirname = path.dirname(src)
        var basename = path.basename(src, path.extname(src))
        var extname = transpilers[_this.target].ext
        return path.join(dest, _this.target, dirname, basename + '.' + extname)
      },
    })

    var dest = path.join(opts.dest, this.target)
    if (grunt.file.exists(dest)) grunt.file.delete(dest)

    async.each(files, function (args, cb) {
      var src = args.src[0]
      var dest = args.dest

      grunt.file.write(dest, transpilers[_this.target].compile(src))
      grunt.log.writeln(">> '" + src + "' > '" + dest + "'")
      cb()
    }, function (err) {
      if (err) {
        grunt.log.error(err)
      } else {
        grunt.log.ok('' + _this.target + ' transpiled')
      }
      done()
    })
  })
}
