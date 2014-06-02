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

gulp.task('concat-components-less', function(){
	gulp.src('less/components/*.less')
		//.pipe(concat('components.less'))
		.pipe(less())
		.pipe(rename('components.less'))
		.pipe(gulp.dest('./less/components'));
});

gulp.task('concat-modules-less', function(){
	gulp.src('less/modules/*.less')
		.pipe(less())
		.pipe(rename('modules.less'))
		.pipe(gulp.dest('./less/modules'));
});

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
	gulp.watch('./js/**/*.js', ['js'], ['clean-scripts']);
	gulp.watch('./less/**/*.less', ['concat-components-less'], ['concat-modules-less'], ['less'], ['clean-css']);
});

// The default task.

gulp.task('default', ['js','clean-scripts','concat-components-less','concat-modules-less','less','clean-css','watch']);