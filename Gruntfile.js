module.exports = function(grunt) {
    // 以下代码初始化Grunt任务
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    port: 8000,
                    base: './'
                }
            }
        },

        less: {
            dev: {
                options: {
                    paths: ['vendor/h5bp/common'],
                },
                files: {
                    'app/asset/css/app.css': ['vendor/h5bp/common/base.less', 'app/asset/css/*.less']
                }
            },
            publish: {
                options: {
                    paths: ['vendor/h5bp/common'],
                    yuicompress: true
                },
                files: {
                    'dist/css/app.min.css': ['vendor/h5bp/common/base.less', 'app/asset/css/*.less']
                }
            }
        },

        watch: {
            css: {
                files: ['**/*.less'],
                tasks: ['less:dev'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'app/asset/img/',
                    src: ['**'],
                    dest: 'dist/img/'
                }]
            },
            com: {
                src: 'config/common.js',
                dest: 'app/config/common.js'
            },
            dev: {
                src: 'config/dev.js',
                dest: 'app/config/env.js'
            },
            alpha: {
                src: 'config/alpha.js',
                dest: 'app/config/env.js'
            },
            rc: {
                src: 'config/rc.js',
                dest: 'app/config/env.js'
            },
            dist: {
                src: 'config/dist.js',
                dest: 'app/config/env.js'
            }
        },

        clean: {
            publish: {
                files: [
                    { src: 'dist/' }
                ]
            }
        },

        requirejs: {
            main: {
                options: {
                    almond: true,
                    baseUrl: "./app",
                    dir: './dist',
                    name: 'main',
                    mainConfigFile: "./app/config.js",
                    fileExclusionRegExp: /^(r|build)\.js$/,
                    include: "main",
                    // out: "dist/main.js",
                    wrap: false,
                    optimize: "uglify2",
                    optimizeCss: 'standard',
                    // removeCombined: true,
                    generateSourceMaps: false,
                    findNestedDependencies: true,
                    preserveLicenseComments: false
                }
            }
        },

        'ftp-deploy': {
            alpha: {
                auth: {
                    host: '192.168.8.174',
                    port: 21,
                    authKey: 'f2e'
                },
                src: ['./'],
                dest: './biz-static/crm-mobile',
                exclusions: [
                    './node_modules',
                    './**/.DS_Store',
                    './.git',
                    './.grunt',
                    './vendor/requirejs/bin',
                    './vendor/**/*.md',
                    './vendor/**/*.json',
                    './.*',
                    './*.rb',
                    './Gruntfile.*',
                    './*.json',
                    './*.md',
                    './doc/cache',
                    './doc/app',
                    './test'
                ]
            },
            dev: {
                auth: {
                    host: '10.1.4.124',
                    port: 21,
                    authKey: 'sys'
                },
                src: ['./'],
                dest: './crm-mobile/<%= pkg.version %>',
                exclusions: [
                    './node_modules',
                    './**/.DS_Store',
                    './.git',
                    './.grunt',
                    './vendor/requirejs/bin',
                    './vendor/**/*.md',
                    './vendor/**/*.json',
                    './.*',
                    './*.rb',
                    './Gruntfile.*',
                    './*.json',
                    './*.md',
                    './doc/cache',
                    './doc/app',
                    './test'
                ]
            },
            rc: {
                auth: {
                    host: '10.1.4.124',
                    port: 21,
                    authKey: 'sys'
                },
                src: ['./'],
                dest: './crm-mobile/rc',
                exclusions: [
                    './node_modules',
                    './**/.DS_Store',
                    './.git',
                    './.grunt',
                    './vendor/requirejs/bin',
                    './vendor/**/*.md',
                    './vendor/**/*.json',
                    './.*',
                    './*.rb',
                    './Gruntfile.*',
                    './*.json',
                    './*.md',
                    './doc/cache',
                    './doc/app',
                    './test'
                ]
            },
            publish: {
                auth: {
                    host: '10.1.2.121',
                    port: 21,
                    authKey: 'dpfile'
                },
                src: ['./'],
                dest: './<%= pkg.name %>/<%= pkg.version %>',
                exclusions: [
                    './node_modules',
                    './**/.DS_Store',
                    './.git',
                    './.grunt',
                    './vendor/requirejs/bin',
                    './vendor/**/*.md',
                    './vendor/**/*.json',
                    './.*',
                    './*.rb',
                    './Gruntfile.*',
                    './*.json',
                    './*.md',
                    './doc/cache',
                    './doc/app',
                    './test'
                ]
            }
        },

        scp: {
            dev: {
                options: {
                    host: '192.168.8.174',
                    username: 'e2f',
                    password: '654321'
                },
                files: [{
                    cwd: './',
                    src: '**/*',
                    filter: 'isFile',
                    dest: './biz-static/<%= pkg.name %>'
                }]
            }
        },

        rsync: {
            options: {
                args: ["--verbose"],
                exclude: [ ".git*", "*.scss", "node_modules", '*.md', '.ftp*', '*.rb', '*.json', 'Gruntfile.*'],
                recursive: true
            },
            dev: {
                options: {
                    src: "./",
                    dest: "e2f@192.168.8.174:/home/e2f/biz-static/<%= pkg.name %>"
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-requirejs')
    grunt.loadNpmTasks('grunt-scp')
    grunt.loadNpmTasks('grunt-amd-doc')
    grunt.loadNpmTasks('grunt-ftp-deploy')
    grunt.loadNpmTasks('grunt-rsync')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('package', ['clean:publish', 'copy:com', 'copy:dist', 'copy:main', 'less:publish', 'requirejs'])
    grunt.registerTask('dist', ['clean:publish', 'copy:com', 'copy:dist', 'copy:main', 'less:dev', 'ftp-deploy:dev'])
    grunt.registerTask('rc', ['clean:publish', 'copy:com', 'copy:rc', 'copy:main', 'less:publish', 'requirejs', 'ftp-deploy:rc'])
    grunt.registerTask('dev', ['less:dev', 'copy:com', 'copy:dev', 'requirejs', 'connect', 'watch'])
    grunt.registerTask('alpha', ['less:dev', 'copy:com', 'copy:alpha', 'requirejs', 'ftp-deploy:alpha'])
};
