var gulp = require('gulp'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css');


gulp.task('less', function () {
    gulp.src([
        'less/main.less' 
    ])
        .pipe(less())
        .pipe(minifyCSS())
        .pipe(concat('styles/main.css'))
        .pipe(gulp.dest('.'))
});

gulp.task('watch', function() {
    gulp.start('less');

    gulp.watch(['less/*.less', 'less/**/*.less'], function() {
        gulp.start('less');
    });

});

gulp.task('default', function() {
  gulp.start('less');
  gulp.start('watch');

});
