var gulp = require('gulp'),
    // Prepare and optimize code etc
	autoprefixer = require('autoprefixer'),
	postcss = require('gulp-postcss'),
	sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),

	// Only work with new or updated files
	newer = require('gulp-newer'),

	// Name of working theme folder
	root = '../',
	scss = root + 'sass/';


// CSS via Sass and Autoprefixer
gulp.task('css', function() {
	return gulp.src(scss + 'bare-minimum.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'expanded', 
		indentType: 'tab',
		indentWidth: '1'
	}).on('error', sass.logError))
	.pipe(postcss([
		autoprefixer('last 2 versions', '> 1%')
	]))
	.pipe(sourcemaps.write(scss + 'maps'))
	.pipe(gulp.dest(root));
});

// Watch everything
gulp.task('watch', function() {
    gulp.watch([root + '**/*.css', root + '**/*.scss' ], ['css' /*,'deploy'*/]);
});


// Default task (runs at initiation: gulp --verbose)
gulp.task('default', ['watch']);
