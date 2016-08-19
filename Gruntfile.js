module.exports = function(grunt) {

	var srcDir = 'src/',
		distDir = 'deploy/public/assets/',
		jsFiles = [
			{
				src: [
					srcDir + 'js/libs/*.js',
					srcDir + 'js/utils/*.js',
					srcDir + 'js/views/*.js',
					srcDir + 'js/components/*.js',
					srcDir + 'js/App.js'
				],
				dest: distDir + 'js/main.js'
			}
		],
		cssFiles = {
			sassDir: srcDir + 'sass',
			fontsDir: srcDir + 'fonts',
			imagesDir: srcDir + 'img',
			httpPath: '/',
			cssDir: distDir + 'css',
			httpStylesheetsPath: '/assets/css',
			httpFontsPath: '/assets/fonts',
			httpImagesPath: '/assets/img',
			relativeAssets: false
		},
		gruntConfig = {

			pkg: grunt.file.readJSON('package.json'),

			compass: {
				dist: {
					options: {
						environment: 'production',
						outputStyle: 'compressed',
						noLineComments: true
					}
				},
				dev: {
					options: {
						environment: 'development',
						outputStyle: 'expanded',
						noLineComments: false
					}
				}
			},

			uglify: {
				dist: {
					options: {
						mangle: false,
						preserveComments: false,
						drop_console: true,
						compress: {
							global_defs: {
								DEBUG: false
							}
						}
					},
					files: jsFiles
				},
				dev: {
					options: {
						mangle: false,
						preserveComments: true,
						drop_console: false,
						compress: false,
						beautify: true,
						report: 'min'
					},
					files: jsFiles
				}

			},

			copy: {
				fonts: {
					files: [{
						cwd: srcDir + 'fonts',
						src: '**/*.{eot,svg,ttf,woff,otf,woff2,css}',
						dest: distDir + 'fonts/',
						expand: true
					}]
				},
				videos: {
					files: [{
						cwd: srcDir + 'videos',
						src: '**/*.{webm,mp4,ogg}',
						dest: distDir + 'videos/',
						expand: true
					}]
				},
				pdf: {
					files: [{
						cwd: srcDir + 'pdf',
						src: '**/*.pdf',
						dest: distDir + 'pdf/',
						expand: true
					}]
				},
				svgs: {
					files: [{
						cwd: srcDir + 'img',
						src: '**/*.svg',
						dest: distDir + 'img/',
						expand: true
					}]
				}
			},

			imagemin: {
				dynamic: {
					options: {
						optimizationLevel: 7,
						progressive: true,
						interlaced: true
					},
					files: [{
						expand: true,
						cwd: srcDir + 'img',
						src: ['**/*.{png,jpg,gif}'],
						dest: distDir + 'img'
					}]
				}
			},

			clean: {
				dist: [
					distDir
				],
				garbage: [distDir + 'img/src']
			},

			htmlbuild: {
				global: {
					src: srcDir + 'index.html',
					dest: srcDir + 'temp/index.html',
					options: {
						beautify: true,
						styles: {
							boilerplate: distDir + 'css/base.css'
						}
					}
				}
			},

			htmlmin: {
				dist: {
					options: {
						removeComments: true,
						collapseWhitespace: true,
						conservativeCollapse: true,
						minifyJS: true,
						minifyCSS: true,
						processScripts: ['x-handlebars-template'],
						maxLineLength: 2048
					},
					files: {
						'deploy/cloud/views/index.ejs': srcDir + 'temp/index.html',
						'deploy/public/index.html': srcDir + 'temp/index.html'
					}
				},
				dev: {
					files: {
						'deploy/cloud/views/index.ejs': srcDir + 'temp/index.html',
						'deploy/public/index.html': srcDir + 'temp/index.html'
					}
				}
			},

			watch: {
				html: {
					files: [srcDir + 'index.html'],
					tasks: ['htmlbuild:global', 'htmlmin:dev', 'notify:watch']
				},
				sass: {
					files: [srcDir + 'sass/**/*'],
					tasks: ['compass:dev', 'htmlbuild:global', 'htmlmin:dev', 'notify:watch']
				},
				scripts: {
					files: [srcDir + 'js/**/*'],
					tasks: ['uglify:dev', 'notify:watch']
				},
				images: {
					files: [srcDir + 'img/**/*.{jpg,png,gif}'],
					tasks: ['newer:imagemin:dynamic', 'clean:garbage', 'notify:watch']
				},
				fonts: {
					files: [srcDir + 'fonts/**/*'],
					tasks: ['newer:copy:fonts', 'notify:watch']
				},
				videos: {
					files: [srcDir + 'videos/**/*'],
					tasks: ['newer:copy:videos', 'notify:watch']
				},
				pdf: {
					files: [srcDir + 'pdf/**/*'],
					tasks: ['newer:copy:pdf', 'notify:watch']
				},
				svgs: {
					files: [srcDir + 'img/**/*.svg'],
					tasks: ['newer:copy:svgs', 'notify:watch']
				}
			},

			notify: {
				watch: {
					options: {
						title: 'Done!',
						message: 'All files have been processed.'
					}
				}
			}

		},
		i;

	for (i in cssFiles) {
		if (cssFiles.hasOwnProperty(i)) {
			gruntConfig['compass']['dist']['options'][i] = cssFiles[i];
			gruntConfig['compass']['dev']['options'][i] = cssFiles[i];
		}
	}

	grunt.initConfig(gruntConfig);

	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-html-build');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-notify');

	grunt.registerTask('default', ['watch']);
	grunt.registerTask('dist', ['clean:dist', 'imagemin:dynamic', 'copy:fonts', 'copy:videos', 'copy:pdf', 'copy:svgs', 'compass:dist', 'uglify:dist', 'htmlbuild:global', 'htmlmin:dist', 'clean:garbage', 'notify:watch']);

};