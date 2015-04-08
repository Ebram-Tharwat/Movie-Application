// include plug-ins
var gulp = require('gulp'),
	less = require('gulp-less'),
	autoprefix = require('gulp-autoprefixer'),
	jasmine = require('gulp-jasmine'),
	jshint = require('gulp-jshint')
karma = require('karma').server;

var lessPath = {
	src: ['./Content/bootstrap/bootstrap.less', './Content/*.less', './Content/fontawesome/font-awesome.less'],
	dest: './Content/'
};
var jsPath = {
	src: ['./app/*.js', './app/**/*.js']
};
var jsSpecs = {
	src: ['./app/specs/*.js']
}

// JS hint task.
// we will ignore it for now(see: http://stackoverflow.com/questions/6803305/).
gulp.task('jshint', function() {
	gulp.src(jsPath.src)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Compile .less files then autoprefix them.
gulp.task('less', function() {
	gulp.src(lessPath.src)
		.pipe(less().on('error', function(err) {
			console.log(err);
		}))
		.pipe(autoprefix("last 2 versions"))
		.pipe(gulp.dest(lessPath.dest));
});

// run jasmine tests
gulp.task('test', function(done) {
	karma.start({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done);
});

gulp.task('default', ['less', 'test'], function() {
	gulp.watch(lessPath.src, ['less']);
	//gulp.watch(jsPath.src, ['jshint']);
})