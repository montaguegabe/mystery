module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');

    var datetime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');

    // Configure
    grunt.initConfig({

        // The build platform
        platform: (grunt.option('platform') || 'web'),

        typescript: {
            all: {
                src: ['platform-specific/<%= platform %>/**/*.ts', 'game/app.ts'],
                dest: 'build/<%= platform %>/js/main.js',
                options: {
                    sourceMap: true
                }
            }
        },
        copy: {
            shared: {
                files: [{
                    cwd: 'game', // try list here
                    expand: true,
                    src: [
                        '**/*.html',
                        'assets/**/*',
                        'style/**/*.css',
                        'js/**/*.js',
                    ],
                    dest: 'build/<%= platform %>/'
                }]
            },
            platform: {
                files: [{
                    cwd: 'platform-specific/<%= platform %>',
                    expand: true,
                    src: [
                        '**/*.html',
                        'assets/**/*',
                        'style/**/*.css',
                        '**/*.js',
                    ],
                    dest: 'build/<%= platform %>/'
                }]
            },
            bower: {
                // Add new runtime dependencies here
                files: [{
                    'build/<%= platform %>/vendor/phaser.min.js': 'vendor/phaser-official/build/phaser.min.js',
                    'build/<%= platform %>/vendor/phaser.map':  'vendor/phaser-official/build/phaser.map'
                }]
            }
        },

        // BEGIN web-platform-specific tasks
        open: {
            web: {
                path: 'http://localhost:8080'
            }
        },
        connect: {
            web: {
                options: {
                    port: 8080,
                    base: 'build/web',
                    livereload: true
                }
            }
        },
        watch: {
            web: {
                files: ['game/**/*', 'platform-specific/web/**/*'],
                tasks: ['typescript', 'copy'],
                options: {
                    livereload: true
                }
            }
        },
        // END web-platform-specific tasks

        clean: {
            native: ['build/native/**/*'],
            web: ['build/web/**/*'],

            // Preserve deployment-related items on mobile build
            mobile: ['build/mobile/**/*', '!build/.nojekyll', '!build/.git']
        },

        // Shell runs commands to get up and running on mobile and native
        shell: {
            native: {
                command: './node_modules/.bin/electron .'
            },
            mobile: {
                command: `cd build/mobile && (git checkout gh-pages; git add .;
                    git commit -m "Build at ${datetime}";
                    git push; cd ..)`
            }
        }
    });

    // Build task
    grunt.registerTask('build', ['typescript', 'copy']);

    // Run task
    grunt.registerTask('run', () => {
        var platform = grunt.config('platform');
        switch (platform) {
            case 'web':
                grunt.task.run(['open', 'connect', 'watch']);
                break;
            case 'native':
            case 'mobile':
                grunt.task.run(['shell:' + platform]);
                break;
            default:
                grunt.log.error(`Error while running: Unknown platform '${platform}'`);
        }
    });


    // SHORTCUTS below

    grunt.registerTask('default', ['build', 'run']);

    // Internal: Overrides the platform for future tasks
    grunt.registerTask('platformset', (platform) => {
        grunt.config('platform', platform);
    });

    // Shortcuts for building and running on each platform
    grunt.registerTask('web', ['platformset:web', 'build', 'run']);
    grunt.registerTask('native', ['platformset:native', 'build', 'run']);
    grunt.registerTask('mobile', ['platformset:mobile', 'build', 'run']);
}
