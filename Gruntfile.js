module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

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
            ]
        });

        // Default task
        grunt.registerTask('default', ['typescript', 'copy', 'open', 'connect', 'watch']);
    }
