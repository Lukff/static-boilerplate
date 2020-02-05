const gulp = require('gulp');
const sass = require('gulp-sass');
const nunjucks = require('gulp-nunjucks-render');
const browserSync = require('browser-sync');
const del = require('del');

function serve() {
  browserSync.init({
            server: "./dist"
        });

  gulp.watch('./src/scss/**/*.scss', compileCSS);
  gulp.watch('./src/templates/**/*.html', templateHTML);
  gulp.watch('./src/assets/**/*', copyAssets);
}

function compileCSS() {
  return gulp.src('./src/scss/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('./dist/css'))
  .pipe(browserSync.stream());
}

function templateHTML() {
  return gulp.src('./src/templates/*.html')
  .pipe(nunjucks({
    path: ['./src/templates/']
  }))
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.stream());
}

function copyAssets() {
  return gulp.src('./src/assets/**/*')
  .pipe(gulp.dest('./dist'));
}

function clean() {
  return del(['./dist/**/*', '!./dist']);
}

function build() {
}

exports.compileCSS = compileCSS;
exports.templateHTML = templateHTML;
exports.serve = serve;
exports.clean = clean;
exports.build = gulp.series(clean,
                    gulp.parallel(copyAssets, compileCSS, templateHTML));
exports.default = serve;
