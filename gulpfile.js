const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const exec = require('gulp-exec');
const concat = require('gulp-concat');

gulp.task('build', () =>
  gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
);

const concatDocs = () =>
  void gulp.src(
      [
        './docs/MAIN.md',
        './docs/LOCALIZATION.md',
        './docs/AUTO.md',
        './docs/DEVELOPMENT.md'
      ]
    ).pipe(concat('README.md'))
     .pipe(gulp.dest('.'));

gulp.task('doc', () => {
  gulp.src(['./src/components/**/*.js', './src/types.js'])
    .pipe(
      exec(
        './node_modules/documentation/bin/documentation.js build -f=md ' +
        '--shallow=true ./src/types.js ./src/components/**/*.js -o ./docs/AUTO.md'
      , concatDocs
      )
    );
});
