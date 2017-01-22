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

const concatDocs = docsNum =>
  void (
    docsNum === 5
    && gulp.src(
      [
        './docs/MAIN.md',
        './docs/LOCALIZATION.md',
        './docs/COMPONENTS.md',
        './docs/TYPES.md',
        './docs/DEVELOPMENT.md'
      ]
    ).pipe(concat('README.md'))
     .pipe(gulp.dest('.'))
  );

gulp.task('doc', () => {
  let docsNum = 3; // MAIN.md, DEVELOPMENT.md, LOCALIZATION.md
  gulp.src('./src/types.js')
    .pipe(
      exec(
        './node_modules/documentation/bin/documentation.js build ' +
        '-f=md --shallow=true ./src/types.js -o ./docs/TYPES.md'
      , () => concatDocs(++docsNum)
      )
    );
  gulp.src('./src/components/**/*.js')
    .pipe(
      exec(
        './node_modules/documentation/bin/documentation.js build -f=md ' +
        '--shallow=true ./src/components/** -o ./docs/COMPONENTS.md'
      , () => concatDocs(++docsNum)
      )
    );
});
