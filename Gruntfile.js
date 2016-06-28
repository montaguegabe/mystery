module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');

    // Get date/time string for configuration
    var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')

    // Configure
    grunt.initConfig({
        typescript: {
            game: {
                src: ['game/app.ts'],
                dest: 'build/js/main.js',
                options: {
                    sourceMap: true
                }
            }
        },
        copy: {
            game: {
                files: [
                    {
                        cwd: 'game',
                        expand: true,
                        src: [
                            '**/*.html',
                            '!vendor/**/*.html',
                            'assets/**/*',
                            'style/**/*.css'],
                            dest: 'build/'
                        }
                    ]
                },
                bower: {
                    files: [
                        {
                            'build/vendor/phaser.min.js': 'game/vendor/phaser-official/build/phaser.min.js',
                            'build/vendor/phaser.map': 'game/vendor/phaser-official/build/phaser.map'
                        }
                    ]
                }
            },
            open: {
                game: {
                    path: 'http://localhost:8080'
                }
            },
            connect: {
                game: {
                    options: {
                        port: 8080,
                        base: 'build',
                        livereload: true
                    }
                }
            },
            watch: {
                game: {
                    files: 'game/**/*',
                    tasks: ['typescript', 'copy'],
                    options: {
                        livereload: true
                    }
                }
            },
            clean: [
                'build/**/*',
                '!build/.nojekyll',
                '!build/.git'
            ],
            shell: {
                nativerun: {
                    command: './node_modules/.bin/electron .'
                },
                phonedeploy: {
                    command: `cd build && (git checkout gh-pages;
                    git commit -am "Build at ${datetime}"; git push; cd ..)`
                }
            }
        });

        // Build task
        grunt.registerTask('build', ['typescript', 'copy']);

        // Serves on a web page with live updates
        grunt.registerTask('web', ['build', 'open', 'connect', 'watch']);

        // Build a native app and run it
        grunt.registerTask('native', ['build', 'shell:nativerun']);

        // Deploy the web app to GitHub pages for phone access
        grunt.registerTask('phone', ['build', 'shell:phonedeploy']);

        grunt.registerTask('default', 'web');
    }
