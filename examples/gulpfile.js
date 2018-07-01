var gulp = require('gulp');
/** REMOVE ME **/ var mtimer = require('../');
/** USE ME **/ // var mtimer = require('gulp-git-mtime');

gulp.task('index', function() {
  return gulp.src('./blog/**/*.md', { base : './' } )
    .pipe(mtimer())
    .pipe(gulp.dest('./'));
});

gulp.task('public', function () {
  return gulp.src('./public/**/*.md')
    .pipe(mtimer())
    .pipe(gulp.dest('./'));
});

gulp.task('default', ['index', 'public']);
