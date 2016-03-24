// Объявляем наши плагины
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var less = require('gulp-less');
var path = require('path');
var concat = require('gulp-concat');
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
	gulp.src(['css/coob/coob1.css', 'css/default/default1.css', 'css/header-menu/header-menu1.css','css/logo/logo1.css','css/menu-top/menu-top1.css'])
    .pipe(concat('all.css'))
    .pipe(gulp.dest('less/'));
	gulp.src('less/default1.less')
	.pipe(plumber())
	.pipe(less({errLogToConsole: true}))
	.pipe(gulp.dest('css/default/'));
	gulp.src('less/coob1.less')
	.pipe(plumber())
	.pipe(less({errLogToConsole: true}))
	.pipe(gulp.dest('css/coob/'));
	gulp.src('less/header-menu1.less')
	.pipe(plumber())
	.pipe(less({errLogToConsole: true}))
	.pipe(gulp.dest('css/header-menu/'));
	gulp.src('less/logo1.less')
	.pipe(plumber())
	.pipe(less({errLogToConsole: true}))
	.pipe(gulp.dest('css/logo/'));
	gulp.src('less/menu-top1.less')
	.pipe(plumber())
	.pipe(less({errLogToConsole: true}))
	.pipe(gulp.dest('css/menu-top/'));
});

gulp.task('default', function() {
	gulp.run('less');
	gulp.watch('less/**', function(event) {
		gulp.run('less');
	})
});
