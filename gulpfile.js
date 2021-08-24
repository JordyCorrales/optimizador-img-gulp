'use strict';

const gulp = require('gulp');
const cache = require('gulp-cache');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const svgo = require('imagemin-svgo');
const gifsicle = require('imagemin-gifsicle');
const mozjpeg = require('imagemin-mozjpeg');
const optipng = require('imagemin-optipng');
const webp = require('gulp-webp');

gulp.task('clean', function () {
  return gulp
    .src(['image-out/*', '!image-out/note.md'], { allowEmpty: true })
    .pipe(clean({ force: true }));
});

gulp.task('clear', () => cache.clearAll());

gulp.task('img', function () {
  return gulp
    .src(['image-in/**/*', '!image-in/note.md'])
    .pipe(
      imagemin([
        imagemin.svgo({
          plugins: [
            { optimizationLevel: 3 },
            { progressive: true },
            { interlaced: true },
            { removeViewBox: false },
            { removeUselessStrokeAndFill: false },
            { cleanupIDs: false },
          ],
        }),
        imagemin.gifsicle(),
        imagemin.mozjpeg({
          quality: 90,
        }),
        imagemin.optipng({
          speed: 1,
          quality: [0.95, 1],
        }),
      ])
    )
    .pipe(gulp.dest('image-out'));
});

gulp.task('img-webp', function () {
  return gulp
    .src(['image-in/**/*', '!image-in/note.md'])
    .pipe(
      imagemin([
        imagemin.svgo({
          plugins: [
            { optimizationLevel: 3 },
            { progressive: true },
            { interlaced: true },
            { removeViewBox: false },
            { removeUselessStrokeAndFill: false },
            { cleanupIDs: false },
          ],
        }),
        imagemin.gifsicle(),
        imagemin.mozjpeg({
          quality: 90,
        }),
        imagemin.optipng({
          speed: 1,
          quality: [0.95, 1],
        }),
      ])
    )
    .pipe(webp())
    .pipe(gulp.dest('image-out'));
});

gulp.task('default', gulp.series('img'));
gulp.task('img-webp', gulp.series('img-webp'));
gulp.task('clean', gulp.series('clean', 'clear'));
