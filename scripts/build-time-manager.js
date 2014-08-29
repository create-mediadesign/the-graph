'use strict';

var build = module.exports;
var deepmerge = require('deepmerge');

build.registerTasks = function(grunt) {
  grunt.registerTask('build-time-manager', [
    'exec:clean_tm_build',
    'exec:prepare_tm_build',
    'copy:time_manager',
    'vulcanize:time_manager',
    'replace:time_manager'
  ]);
};

build.configure = function(grunt, config) {

  grunt.loadNpmTasks('grunt-vulcanize');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-replace');

  return deepmerge(config, {
    'exec': {
      'prepare_tm_build': {
        'command': 'mkdir -p ./build/time-manager/app'
      },
      'clean_tm_build': {
        'command': 'rm -rf ./build/time-manager/'
      }
    },
    'copy': {
      'time_manager': {
        'files': [
          {
            'expand': false,
            'src': ['bower_components/font-awesome/fonts/fontawesome-webfont.*', 'bower_components/klay-js/klay-worker.js'],
            'dest': './build/time-manager/',
            'flatten': true
          },
          {
            'src': [
              './bower_components/platform/platform.js.map',
              './bower_components/hammerjs/hammer.min.map',
              './bower_components/polymer/polymer.js.map'
            ],
            'dest': './build/time-manager/app/',
            'expand': true,
            'flatten': true,
            'filter': 'isFile',
          }
        ]
      }
    },
    'vulcanize': {
      'time_manager': {
        'options': {
          // Task-specific options go here.
          'inline': true
        },
        'files': {
          "build/time-manager/app/index.html": "the-time-manager/sample.html"
          // Target-specific file lists and/or options go here.
        },
      },
    },
    'replace': {
      'time_manager': {
        'options': {
          'verbose': true,
          'patterns': [{
            'match': /\(\.\.\/\.\.\/\.\.\/bower_components/g,
            'replacement': '(../bower_components'
          }]
        },
        'files': [
          { 'src': 'build/time-manager/app/index.html', 'dest': 'build/time-manager/app/index.html' }
        ]
      }
    }
  });

};
