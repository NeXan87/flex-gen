import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import svgstore from 'gulp-svgstore';
import sourcemaps from 'gulp-sourcemaps';
import squoosh from 'gulp-libsquoosh';
import svgo from 'gulp-svgmin';
import { deleteAsync } from 'del';
import bemlinter from 'gulp-html-bemlinter';
import browser from 'browser-sync';
import ghPages from 'gulp-gh-pages';

export function lintBem() {
  return gulp.src('source/*.html')
    .pipe(bemlinter());
}

// Styles

export const styles = () => gulp
  .src('source/sass/style.scss', { sourcemaps: true })
  .pipe(plumber())
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([autoprefixer(), csso()]))
  .pipe(rename('style.min.css'))
  .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
  .pipe(browser.stream());

// HTML

const html = () => gulp
  .src('source/*.html')
  .pipe(plumber())
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));

// Script

const script = () => gulp
  .src('source/js/*.js')
  .pipe(sourcemaps.init())
  .pipe(terser())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('build/js'))
  .pipe(browser.stream());

// Images

const optimizeImages = () => gulp
  .src('source/images/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/images'));

const copyImages = () => gulp.src('source/images/**/*.{jpg,png}').pipe(gulp.dest('build/images'));

// SVG

const svg = () => gulp
  .src(['source/images/**/*.svg', '!source/images/svg/sprite/*.svg'])
  .pipe(svgo())
  .pipe(gulp.dest('build/images'));

const sprite = () => gulp
  .src('source/images/svg/sprite/*.svg')
  .pipe(svgo())
  .pipe(svgstore({ inlineSvg: true }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/images/svg'));

// Copy

const copy = (done) => {
  gulp
    .src(['source/fonts/*.{woff2,woff}', 'source/*.ico', 'source/**/*.webmanifest'], { base: 'source' })
    .pipe(gulp.dest('build'));
  done();
};

// Clean

const clean = () => deleteAsync('build');

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build',
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Reload

const reload = (done) => {
  browser.reload();
  done();
};

// Deploy

gulp.task('deploy', () => gulp.src('./build/**/*').pipe(ghPages()));

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html', gulp.series(html, reload));
  gulp.watch('source/js/*.js', gulp.series(script));
  gulp.watch('source/images/**/*.{jpg,png}', gulp.series(copyImages, reload));
  gulp.watch('source/images/**/*.svg', gulp.series(sprite, svg, reload));
};

// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(styles, html, script, svg, sprite)
);

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(styles, html, script, svg, sprite),
  gulp.series(server, watcher)
);
