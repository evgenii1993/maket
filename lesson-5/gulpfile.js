// Объявляем наши плагины
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var less = require('gulp-less');
var path = require('path');
// Создаем sass задание
// gulp.src - путь по которому лежит scss-файл который мы будем компилировать
// gulp.dest - путь в который мы будем генерить нашу css-ку
// plumber() - не выбрасывать из компилятора если есть ошибки
// errLogToConsole: true - выводить номер строки в которой допущена ошибка
gulp.task('sass', function () {
	gulp.src('sass/main.scss')
	.pipe(plumber())
	.pipe(sass({errLogToConsole: true}))
	.pipe(gulp.dest('css/'));
});
gulp.task('default', function() {
	gulp.run('sass');
	gulp.watch('sass/**', function(event) {
		gulp.run('sass');
	})
})

gulp.task('less', function () {
	gulp.src('sass/main.less')
	.pipe(plumber())
	.pipe(less({errLogToConsole: true}))
	.pipe(gulp.dest('css/'));
});
gulp.task('default', function() {
	gulp.run('less');
	gulp.watch('sass/**', function(event) {
		gulp.run('less');
	})
})