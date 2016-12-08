// Grunt tasks

module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
    '* <%= pkg.name %> - v<%= pkg.version %> - MIT LICENSE <%= grunt.template.today("yyyy-mm-dd") %>. \n' +
    '* @author <%= pkg.author %>\n' +
    '*/\n',

    clean: {
      options: {
        'force': true
      },
      dist: ['www'],
      testjs: ['www/**/*test.js'],
      nomin: [
        'www/**/*.css',
        'www/**/*.js',
        '!www/**/*min.css',
        '!www/**/*min.js'
      ],
      libs: ['www/app/assets/libs']
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      app: {
        src: ['www/app/modules/**/*.js']
      }
    },

    exec: {
      bowerInstaller: 'bower-installer'
    },

    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: false
      },
      base: {
        src: [
          // Angular Project Dependencies,
          'src/app/app.js',
          'src/app/app.config.js',
          'src/app/modules/**/*Module.js',
          'src/app/modules/**/*Route.js',
          'src/app/modules/**/*Ctrl.js',
          'src/app/modules/**/*Service.js',
          'src/app/modules/**/*Directive.js',
          'www/**/templates.js'
        ],
        dest: 'www/<%= pkg.name %>-<%= pkg.version %>-appbundle.js'
      },
      css: {
        src: [ 'www/**/*.css' ],
        dest: 'www/<%= pkg.name %>-<%= pkg.version %>.min.css'
      },
      build: {
        src: [
          // Angular Project Dependencies,
          'www/app/assets/libs/angular/angular.js',
          'www/app/assets/libs/**/*.js'
        ],
        dest: 'www/<%= pkg.name %>-<%= pkg.version %>-angularbundle.js'
      }
    },

    copy: {
      dev: {
        expand: true,
        cwd: 'src',
        src: '**',
        dest: 'www/',
      },
      build: {
        expand: true,
        cwd: 'src',
        src: ['index.html'],
        dest: 'www/',
      }
    },

    bower: {
      dev: {
        options: {
          expand: true
        },
        dest: 'www/'
      },
      build: {
        options: {
          expand: true,
          ignorePackages: ['angular-mocks']
        },
        dest: 'www/app/assets/libs/'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'min'
      },
      all: {
        src: ['<%= concat.build.dest %>', '<%= concat.base.dest %>'],
        dest: 'www/<%= pkg.name %>-<%= pkg.version %>-angscript.min.js'
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'www',
          src: ['**/*.css', '!**/*.min.css'],
          dest: 'www/',
          ext: '.css'
        }]
      }
    },

    connect: {
      server: {
        options: {
          keepalive: true,
          port: 4000,
          base: 'www',
          hostname: 'localhost',
          debug: true,
          livereload: true,
          open: true
        }
      }
    },
    concurrent: {
      tasks: ['connect', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    },

    watch: {
      app: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app'],
        options: {
          livereload: true
        }
      }
    },

    injector: {
      options: {
        ignorePath: [ 'www', 'bower_components' ],
        addRootSlash: false
      },
      dev: {
        files: {
          'www/index.html': [
            'bower.json',
            'www/app/assets/css/*.css',
            'www/app/app.js',
            'www/app/app.config.js',
            'www/app/modules/**/*.js'
          ]
        }
      },
      production: {
        files: {
          'www/index.html': [
            'www/**/*.css',
            'www/**/*.js'
          ]

        }
      }
    },

    ngtemplates: {
      app: {
        cwd: 'src',
        src: 'app/modules/**/*.html',
        dest: 'www/app/assets/js/templates.js',
        options: {
          module: '<%= pkg.name %>',
          root: 'app/',
          standAlone: false
        }
      }
    }



  });

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Making grunt default to force in order not to break the project if something fail.
  grunt.option('force', true);

  // Register grunt tasks
  grunt.registerTask('build', [
    'clean',
    'jshint',
    'exec',
    'copy:build',
    'ngtemplates',
    'bower:build',
    'cssmin',
    'concat',
    'uglify',
    'clean:nomin',
    'clean:libs',
    'injector:production'
  ]);

  grunt.registerTask('build:serve', [
    'build',
    'concurrent'
  ]);

  // Development task(s).
  grunt.registerTask('dev', [
    'clean',
    'copy:dev',
    'bower:dev',
    'clean:testjs',
    'injector:dev',
    'concurrent'
  ]);

};
