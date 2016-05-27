module.exports = function(grunt) {
  var jsFiles = ['Gruntfile.js', 'webService/*.js', 'webService/resources/*.js'];
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: jsFiles,
      options: {
        jshintrc: '.jshintrc'
      }
    },
    jscs: {
      files: jsFiles,
      options: {
        config: '.jscsrc'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.registerTask('default', ['jshint', 'jscs']);
};



