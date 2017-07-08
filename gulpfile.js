var gulp = require('gulp');
var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var webserver = require('gulp-webserver');
var transform = require('vinyl-transform');
var jshint = require('gulp-jshint');

var bundlePath = 'app/js/bundle.js';
gulp.task('browserifyAndWatchify', function() {
    var b = browserify({
        entries: ['./app/js/app.js'],
        transform: [reactify],
        cache: {}, packageCache: {}, fullPaths: true ,
        plugin:[watchify]
    });
    b.on('update', function () {
        bundle();
    })
    bundle();
    function bundle() {
        b.bundle().pipe(fs.createWriteStream(bundlePath));
    }
});

gulp.task('browserifyAndUgilify', function() {
    var b = browserify({
        entries: ['./app/js/app.js'],
        transform: [reactify],
        cache: {}, packageCache: {}, fullPaths: true
    });
    b.bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('app/js/'));
});

gulp.task('lint', function() {
  return gulp.src('./app/js/store/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
        port: 3000,
        fallback: 'index.html'
    }));
});

gulp.task('run-prod', ['browserifyAndUgilify','webserver']);
gulp.task('run-dev', ['lint', 'browserifyAndWatchify','webserver']);
