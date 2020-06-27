/**
 * This script has only one purpose - generate documentation
 */

const gulp = require("gulp");
const exec = require("gulp-exec");
const concat = require("gulp-concat");

const concatDocs = () =>
  gulp
    .src([
      "./docs/MAIN.md",
      "./docs/LOCALIZATION.md",
      "./docs/AUTO.md",
      "./docs/DEVELOPMENT.md",
    ])
    .pipe(concat("README.md"))
    .pipe(gulp.dest("."));

gulp.task("doc", (cb) =>
  gulp
    .src("*")
    .pipe(
      exec(
        "./node_modules/documentation/bin/documentation.js build -f md " +
          "./src/components/*/*.js ./src/helpers.js ./src/types.js -o ./docs/AUTO.md",
        (err) => cb(err, concatDocs)
      )
    )
);
