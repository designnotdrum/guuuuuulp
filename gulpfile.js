var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    clean		= require('gulp-clean'),
    less		= require('gulp-less'),
    notify		= require('gulp-notify'),
    rename		= require('gulp-rename'),
    watch		= require('gulp-watch');


// Concat & Minify Javascript files.

gulp.task('js', function(){
	gulp.src('./js/**/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(notify({
			message: "Javascript Concatenated & Minified."
		}));
});

// Compile LESS files.

gulp.task('less', function(){
	gulp.src('less/all.less')
		.pipe(less())
		.pipe(rename('styles.css'))
		.pipe(gulp.dest('dist/css'))
		.pipe(notify({
			message: "Less compiled."
		}));
});

// Clean the dist folders.

gulp.task('clean-scripts', function(){
	gulp.src('dist/js')
		.pipe(clean());
});

gulp.task('clean-css', function(){
	gulp.src('dist/css')
		.pipe(clean());
});

// Watch files for changes and reload when they occur.

gulp.task('watch', function(){
	gulp.watch({ glob: './js/**/*.js'}, ['js'], ['clean-scripts']);
	gulp.watch({ glob: './less/**/*.less'}, ['less'], ['clean-css']);
});

// The default task.

gulp.task('default', ['js','clean-scripts','less','clean-css','watch']);