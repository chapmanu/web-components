'use strict';

/**
 * Plugins
 */
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')();
var tagVersion = require('gulp-tag-version');
var fileinclude = require('gulp-file-include');

/**
 * Configuration variables
 */
var sourceScripts       = ['src/scripts/**/*.js'];
var sourceStyles        = ['src/styles/cu_components.scss'];
var sourceImages        = ['src/images/placeholders/*'];
var sourceIcons         = ['src/images/icons/*.svg'];
var sourceHtml          = 'src/html/*.html';
var sourceHtmlTemplates = 'src/html/templates/*.html';
var destination         = 'dist';
var cleanFolders        = ['dist/**/*', 'demos/**/*'];

/**
 * Tasks
 */
gulp.task('styles', function () {
	return gulp.src(sourceStyles)
		.pipe($.compass({
			sass: 'src/styles',
			css: destination,
			image: 'src/images',
			time: true
		})).on('error', handleError)
		.pipe($.autoprefixer('> 5%')).on('error', handleError)
		.pipe($.size());
});

gulp.task('scripts', function () {
	return gulp.src(sourceScripts)
		.pipe($.jshint()).on('error', handleError)
		.pipe($.jshint.reporter(require('jshint-stylish')))
		.pipe($.concat('cu_components.js'))
		.pipe(gulp.dest(destination))
		.pipe($.size());
});

gulp.task('images', function () {
	return gulp.src(sourceImages)
		.pipe(gulp.dest(destination + '/images')).on('error', handleError)
		.pipe($.size());
});

gulp.task('icons', function() {
	return gulp.src(sourceIcons)
		.pipe($.svgmin())
		.pipe($.svgstore({
			fileName: 'sprite.svg'
			}))
		.pipe(gulp.dest(destination + '/images'));
});

gulp.task('icons-preview', function() {
	var target = gulp.src("demos/icons-preview.html");
	var icons  = gulp.src("src/images/icons/*.svg", {read: false});
	return target.pipe($.inject(icons, {
			transform: function(filepath, file, index, length, targetFile) {
				var id = filepath.split("/").slice(-1).pop().replace(".svg", "");
				return "<div class=\"preview\">" +
				       "<p>#" + id + "</p>" +
							 "<svg><use xlink:href=\"../dist/images/sprite.svg#"+id+"\"/></svg>" +
							 "</div>";
			}
		}))
		.pipe(gulp.dest('demos'));
});

gulp.task('fileinclude', function() {
	return gulp.src(sourceHtml)
		.pipe(fileinclude()).on('error', handleError)
		.pipe(gulp.dest('./demos'))
		.pipe($.size());
});

gulp.task('html', ['fileinclude', 'styles', 'scripts'], function () {
	var jsFilter = $.filter('**/*.js');
	var cssFilter = $.filter('**/*.css');

	return gulp.src('src/*.html')
		.pipe($.useref.assets({searchPath: '{dist, src}'}))
		.pipe(jsFilter)
		.pipe($.uglify())
		.pipe(jsFilter.restore())
		.pipe(cssFilter)
		.pipe($.csso())
		.pipe(cssFilter.restore())
		.pipe($.useref.restore())
		.pipe($.useref())
		.pipe(gulp.dest(destination))
		.pipe($.size());
});

gulp.task('clean', function () {
	return gulp.src(cleanFolders, { read: false }).pipe($.clean());
});

gulp.task('connect', function () {
	var connect = require('connect');
	var app = connect()
		.use(require('connect-livereload')({ port: 35729 }))
		.use(connect.static(destination))
		.use(connect.static('./'));

	require('http').createServer(app)
		.listen(9000)
		.on('listening', function () {
			console.log('Started connect web server on http://localhost:9000');
		});
});

gulp.task('serve', ['connect', 'fileinclude', 'styles'], function () {
	require('opn')('http://localhost:9000/demos');
});

// inject bower components
gulp.task('wiredep', function () {
	var wiredep = require('wiredep').stream;

	gulp.src('src/styles/*.scss')
		.pipe(wiredep({
			directory: 'src/bower_components'
		}))
		.pipe(gulp.dest('src/styles'));

	gulp.src('src/*.html')
		.pipe(wiredep({
			directory: 'src/bower_components'
		}))
		.pipe(gulp.dest('src'));
});

gulp.task('watch', ['connect', 'serve'], function () {
	var server = $.livereload();

	// watch for changes

	gulp.watch([
		'demos/*.html',
		'dist/**/*',
	]).on('change', function (file) {
		server.changed(file.path);
	});

	gulp.watch('src/html/**/*.html', ['fileinclude']);
	gulp.watch('src/styles/**/*.scss', ['styles']);
	gulp.watch('src/scripts/**/*.js', ['scripts']);
	gulp.watch('src/images/icons/*.svg', ['icons', 'icons-preview']);
	gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['images', 'styles', 'scripts']);

function bump(versionLevel) {
	return gulp.src(['./package.json', './bower.json'])
		.pipe($.bump({type: versionLevel}))
		.pipe(gulp.dest('./'))
		.pipe($.git.commit('bump package version'))
		.pipe($.filter('bower.json'))
		.pipe(tagVersion());
}

gulp.task('patch', function() { return bump('patch') });
gulp.task('minor', function() { return bump('minor') });
gulp.task('major', function() { return bump('major') });

gulp.task('default', ['clean'], function () {
	gulp.start('build');
});

function handleError(error) {
    console.log(error.toString());
    this.emit('end');
}
