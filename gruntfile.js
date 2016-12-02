module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        // all of our task configuration goes in here

        clean: ['build/'],

        jshint: {
            //all: ['gruntfile.js', 'lib/**/*.js', 'test/**/*.js'] ,
            options: {
                jshintrc: '.jshintrc',
                ignores: ['node_modules/**']
            },
            source: {
                files: {
                    src: [ 'src/js/**/*.js' ]
                }
            }
        },

        sass: {
            allStyles: {
                files: {
                    'build/css/styles.css': 'src/sass/main.scss'
                }
            }
        },

        copy: {
            html: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [ 'index.html' ],
                        dest:  'build/'
                    }
                ]
            },
            vendorjs: {
                files: [
                    {
                        expand: true,
                        cwd: 'node_modules/angular/',
                        src: [ 'angular.js' ],
                        dest: 'build/js/'
                    }
                ]
            }
        },

        concat: {
            js: {
                src: [ 'build/js/angular.js', 'src/js/shop.module.js' ,'src/js/**/*.js' ],
                dest: 'build/js/app.js'
            }
        },
        karma: { //task name
            options: {
                //these options apply to all of our TARGETS
                frameworks: ['mocha', 'chai'],
                client: {
                    mocha: {
                        ui: 'bdd'
                    }
                },
                browsers: [ 'PhantomJS' ],
                singleRun: true,

                preprocessors: {
                    'src/js/**/*.js': [ 'coverage' ]
                },
                reporters: [ 'dots', 'coverage' ],
                coverageReporter: {
                    type: 'text-summary'
                }
            },

            // targets
            registrar: {
                options: {
                    //these are options specific tp this targets
                    files: [
                        'node_modules/angular/angular.js',
                        'node_modules/angular-mocks/angular-mocks.js',
                        'src/js/shop.module.js',
                        'src/js/inventory.controller.js',
                        'src/js/localStorage.service.js',
                        'test/specs/inventory.controller.spec.js'
                    ]
                }
            }
        },

        watch: {
            html: {
                files: ['src/index.html'],
                tasks: ['copy:html']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['test', 'concat', ]
            },
            sass: {
                files: ['src/sass/*.scss'],
                tasks: [ 'sass' ]
            },
            test: {
                files: ['test/specs/**/*.js'],
                tasks: ['test', 'karma']
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask( 'test', [ 'jshint']);
    grunt.registerTask( 'default', [ 'clean', 'test', 'copy', 'concat' ] );

};
