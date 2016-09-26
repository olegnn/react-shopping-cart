const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const documentation = require('gulp-documentation');
const concat = require('gulp-concat');

gulp.task('build', () =>
  gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
);

gulp.task('doc', () => {
  gulp.src('./src/components/*.js')
    .pipe(documentation({ shallow: true, format: 'md', filename: 'COMPONENTS.md' }))
    .pipe(gulp.dest('docs'));
  gulp.src('./src/types.js')
    .pipe(documentation({ shallow: true, format: 'md', filename: 'TYPES.md' }))
    .pipe(gulp.dest('docs'));
  gulp.src(['./docs/MAIN.md', './docs/COMPONENTS.md', './docs/TYPES.md', './docs/DEVELOPMENT.md'])
    .pipe(concat('README.md'))
    .pipe(gulp.dest('.'));
});
