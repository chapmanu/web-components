'use strict';
// generated on 2014-10-02 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();
var tag_version = require('gulp-tag-version');

gulp.task('styles', function () {
	return gulp.src('src/styles/cu_components.scss')
		.pipe($.compass({
			css: 'src/styles',
			sass: 'src/styles',
			image: 'src/images'
		})).on('error', handleError)
		.pipe($.autoprefixer('> 5%')).on('error', handleError)
		.pipe(gulp.dest('dist')).on('error', handleError)
    .pipe(gulp.dest('./'))
		.pipe($.size());
});

gulp.task('scripts', function () {
	return gulp.src('src/scripts/**/*.js')
		.pipe($.jshint()).on('error', handleError)
		.pipe($.jshint.reporter(require('jshint-stylish')))
		.pipe($.concat('cu_components.js'))
		.pipe(gulp.dest('dist'))
		.pipe(gulp.dest('src/scripts'))
    .pipe(gulp.dest('./'))
		.pipe($.size());
});

gulp.task('images', function () {
	return gulp.src('src/images/**/*')
		.pipe(gulp.dest('dist/images')).on('error', handleError)
		.pipe($.size());
});

gulp.task('fileinclude', function() {
	var fileinclude = require('gulp-file-include');
	return gulp.src(['src/html/*.html'])
		.pipe(fileinclude()).on('error', handleError)
		.pipe(gulp.dest('./src'))
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
		.pipe(gulp.dest('dist'))
		.pipe($.size());
});

gulp.task('extras', function () {
	return gulp.src(['src/*.*', '!src/*.html'], { dot: true })
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
	return gulp.src(['dist'], { read: false }).pipe($.clean());
});

gulp.task('connect', function () {
	var connect = require('connect');
	var app = connect()
		.use(require('connect-livereload')({ port: 35729 }))
		.use(connect.static('src'))
		.use(connect.static('dist'))
		.use(connect.directory('src'));

	require('http').createServer(app)
		.listen(9000)
		.on('listening', function () {
			console.log('Started connect web server on http://localhost:9000');
		});
});

gulp.task('serve', ['connect', 'fileinclude', 'styles'], function () {
	require('opn')('http://localhost:9000');
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
		'src/*.html',
		'dist/styles/**/*.css',
		'src/scripts/**/*.js',
		'src/images/**/*'
	]).on('change', function (file) {
		server.changed(file.path);
	});

	gulp.watch('src/html/**/*.html', ['fileinclude']);
	gulp.watch('src/styles/**/*.scss', ['styles']);
	gulp.watch('src/scripts/**/*.js', ['scripts']);
	gulp.watch('src/images/**/*', ['images']);
	gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['images', 'styles', 'scripts']);

function bump(versionLevel) {
	return gulp.src(['./package.json', './bower.json'])
		.pipe($.bump({type: versionLevel}))
		.pipe(gulp.dest('./'))
		.pipe($.git.commit('bump package version'))
		.pipe($.filter('bower.json'))
		.pipe(tag_version());
}

gulp.task('patch', function() { return bump('patch') });

gulp.task('default', ['clean'], function () {
	gulp.start('build');
});

// Eat up all the errors
function handleError(error) {
    console.log(error.toString());
    this.emit('end');
}
