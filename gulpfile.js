var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var less = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

gulp.task('build', function () {
    return browserify({
    	entries: './react/app.jsx',
    	extensions: ['.jsx'],
    	debug: true
    })
    .transform('babelify', {
    	presets: ["es2015", "react", "stage-0"]
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('less', function () {
        gulp.src([
            'less/styles.less'
        ])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(concat('dist/style.css'))
        .pipe(gulp.dest('.'))
});


gulp.task('watch', ['build'], function () {
    gulp.watch([
        'react/*/*.jsx',
        'react/*/*/*.jsx'
    ], ['build']);

    gulp.watch([
        'less/*.less',
        'less/*/*.less'], function() {
        gulp.start('less');
    });
});

gulp.task('default', ['watch']);
