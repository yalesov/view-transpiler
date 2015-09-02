transpilers = require './main'
fs = require 'fs'
path = require 'path'
async = require 'async'

module.exports = (grunt) ->
  grunt.registerMultiTask 'transpile', 'Transpile view templates', ->
    done = @async()

    opts = @options()
    files = grunt.file.expandMapping opts.src, opts.dest,
      cwd: opts.cwd
      filter: grunt.file.isFile
      rename: (dest, src, opts) =>
        dirname = path.dirname src
        basename = path.basename src, path.extname src
        extname = transpilers[@target].ext
        path.join dest, @target, dirname, "#{basename}.#{extname}"

    dest = path.join opts.dest, @target
    grunt.file.delete dest if grunt.file.exists dest

    async.each files, ({src, dest}, cb) =>
      src = src[0]
      grunt.file.write dest, transpilers[@target].compile src
      grunt.log.writeln ">> '#{src}' > '#{dest}'"
      cb()
    , (err) =>
      if err
        grunt.log.error err
      else
        grunt.log.ok "#{@target} transpiled"
      done()
