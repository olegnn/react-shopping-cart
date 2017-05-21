/**
 * This script has only one purpose - generate documentation
 */

const gulp = require('gulp');
const exec = require('gulp-exec');
const concat = require('gulp-concat');

const concatDocs = () =>
  void (
    gulp
      .src(
        [
          './docs/MAIN.md',
          './docs/LOCALIZATION.md',
          './docs/AUTO.md',
          './docs/DEVELOPMENT.md'
        ]
      )
      .pipe(concat('README.md'))
      .pipe(gulp.dest('.'))
  );

gulp.task('doc', () =>
  void (
    gulp
      .src('*')
      .pipe(
        exec(
          './node_modules/documentation/bin/documentation.js build -f md ' +
          './src/components/**/*.js ./src/types.js -o ./docs/AUTO.md'
         , concatDocs
        )
      )
  )
);
