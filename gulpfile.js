'use strict'

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const del = require('del');
const browserSync = require('browser-sync').create();
// const resolveUrl = require('gulp-resolve-url');
const prettify = require('gulp-jsbeautifier');
const combiner = require('stream-combiner2').obj;

gulp.task('pug', () => {
  return combiner(
    gulp.src('frontend/pug/pages/*.pug'),
    $.pug(),
    $.prettyHtml(),
    gulp.dest('public')

  ).on('error', $.notify.onError(function(err) {
    return {
      title: 'pug',
      message: err.message
    }
  }));
});

gulp.task('styles', () => {
  return combiner(
    gulp.src('frontend/styles/*.scss'),
    $.sourcemaps.init(),
    $.sass(),
    $.autoprefixer({
      browsers: [
        "> 1%",
        "last 2 versions",
        "ie >= 11"
      ],
      grid: true
    }),
    // .pipe($.shorthand())
    $.csso(),
    $.resolveUrl(),
    $.sourcemaps.write(),
    gulp.dest('public/styles')
  ).on('error', $.notify.onError(function(err) {
    return {
      title: 'styles',
      message: err.message
    }
  }));
});

gulp.task('styles:popup', () => {
  return combiner(
    gulp.src('frontend/styles/components/popup-buy.scss'),
    $.sourcemaps.init(),
    $.sass(),
    $.autoprefixer({
      browsers: [
        "> 1%",
        "last 2 versions",
        "ie >= 11"
      ],
      grid: true
    }),
    // .pipe($.shorthand())
    $.csso(),
    // resolveUrl(),
    $.sourcemaps.write(),
    gulp.dest('public/styles')
  ).on('error', $.notify.onError(function(err) {
    return {
      title: 'styles',
      message: err.message
    }
  }));
});

gulp.task('styles:dynamic-banner', () => {
  return combiner(
    gulp.src('frontend/styles/components/dynamic-banner.scss'),
    $.sourcemaps.init(),
    $.sass(),
    $.autoprefixer({
      browsers: [
        "> 1%",
        "last 2 versions",
        "ie >= 11"
      ],
      grid: true
    }),
    // .pipe($.shorthand())
    $.csso(),
    // resolveUrl(),
    $.sourcemaps.write(),
    gulp.dest('public/styles')
  ).on('error', $.notify.onError(function(err) {
    return {
      title: 'styles',
      message: err.message
    }
  }));
});

gulp.task('scripts', () => {
  return combiner(
    gulp.src(['frontend/scripts/components/script.js'], {base: 'frontend'}),
    $.concat('script.js'),
    $.babel({
      presets: ['@babel/env']
    }),
    gulp.dest('public/scripts')
  ).on('error', $.notify.onError(function(err) {
    return {
      title: 'scripts',
      message: err.message
    }
  }));
});

gulp.task('scripts:shop', () => {
  return combiner(
    gulp.src(['frontend/scripts/components/popup-buy.js']),
    $.concat('popup-buy.js'),
    $.babel({
      presets: ['@babel/env']
    }),
    gulp.dest('public/scripts')
  ).on('error', $.notify.onError(function(err) {
    return {
      title: 'scripts:shop',
      message: err.message
    }
  }));
});

gulp.task('copy:styles:swiper', () => {
  return gulp
    .src('node_modules/swiper/dist/css/swiper.min.css', {since: gulp.lastRun('copy:styles:swiper')})
    .pipe($.newer('public/styles'))
    .pipe(gulp.dest('public/styles'));
});

gulp.task('copy:styles', () => {
  return gulp
    .src('frontend/styles/*.css', {since: gulp.lastRun('copy:styles')})
    .pipe($.newer('public/styles'))
    .pipe(gulp.dest('public/styles'));
});

gulp.task('copy:styles:animate', () => {
  return gulp
    .src('node_modules/animate.css/animate.min.css', {since: gulp.lastRun('copy:styles:animate')})
    .pipe($.newer('public/styles'))
    .pipe(gulp.dest('public/styles'));
})

gulp.task('copy:scripts', () => {
  return gulp
    .src('frontend/scripts/libs/**/*.*', {since: gulp.lastRun('copy:scripts')})
    .pipe($.newer('public/scripts'))
    .pipe(gulp.dest('public/scripts'));
});

gulp.task('fonts', function() {
  return gulp
    .src('frontend/assets/fonts/*.*', {since: gulp.lastRun('fonts')})
    .pipe($.newer('public/assets/fonts'))
    .pipe(gulp.dest('public/assets/fonts'))
});

gulp.task('images', function() {
  return gulp.src('frontend/assets/img/*.*', {since: gulp.lastRun('images')})
    .pipe($.newer('public/assets/img'))
    .pipe($.imagemin([
      $.imagemin.gifsicle({interlaced: true}),
      $.imagemin.jpegtran({progressive: true}),
      $.imagemin.optipng({optimizationLevel: 3}),
      $.imagemin.svgo({
        plugins: [
          {cleanupAttrs: true},
          {inlineStyles: true},
          {removeDoctype: true},
          {removeXMLProcInst: true},
          {removeComments: true},
          {removeMetadata: true},
          {removeTitle: true},
          {removeDesc: true},
          {removeUselessDefs: true},
          {removeXMLNS: false},
          {removeEditorsNSData: true},
          {removeEmptyAttrs: true},
          {removeHiddenElems: true},
          {removeEmptyText: true},
          {emoveEmptyContainers: true},
          {removeViewBox: false},
          {cleanupEnableBackground: true},
          {minifyStyles: false},
          {convertStyleToAttrs: true},
          {convertColors: true},
          {convertPathData: true},
          {convertTransform: true},
          {removeUnknownsAndDefaults: true},
          {removeNonInheritableGroupAttrs: true},
          {removeUselessStrokeAndFill: true},
          {removeUnusedNS: true},
          {cleanupIDs: true},
          {cleanupNumericValues: true},
          {cleanupListOfValues: true},
          {moveElemsAttrsToGroup: true},
          {moveGroupAttrsToElems: true},
          {collapseGroups: true},
          {removeRasterImages: true},
          {mergePaths: true},
          {convertShapeToPath: true},
          {sortAttrs: true},
          {removeDimensions: true},
          {removeAttrs: true},
          {removeElementsByAttr: false},
          {addClassesToSVGElement: false},
          {addAttributesToSVGElement: false},
          {removeStyleElement: false},
          {removeScriptElement: false},
        ]
      })
    ]))
    .pipe(gulp.dest('public/assets/img'));
});

gulp.task('videos', () => {
  return gulp
    .src('frontend/assets/*.mp4', {since: gulp.lastRun('videos')})
    .pipe($.newer('public/assets'))
    .pipe(gulp.dest('public/assets'))
});

gulp.task('icons', function() {
  return gulp.src('frontend/assets/img/icons/*.*', {since: gulp.lastRun('icons')})
    .pipe($.newer('public/assets/img/icons'))
    .pipe($.imagemin([
      $.imagemin.svgo({
        plugins: [
          {cleanupAttrs: true},
          {inlineStyles: true},
          {removeDoctype: true},
          {removeXMLProcInst: true},
          {removeComments: true},
          {removeMetadata: true},
          {removeTitle: true},
          {removeDesc: true},
          {removeUselessDefs: true},
          {removeXMLNS: false},
          {removeEditorsNSData: true},
          {removeEmptyAttrs: true},
          {removeHiddenElems: true},
          {removeEmptyText: true},
          {emoveEmptyContainers: true},
          {removeViewBox: false},
          {cleanupEnableBackground: true},
          {minifyStyles: false},
          {convertStyleToAttrs: true},
          {convertColors: true},
          {convertPathData: true},
          {convertTransform: true},
          {removeUnknownsAndDefaults: true},
          {removeNonInheritableGroupAttrs: true},
          {removeUselessStrokeAndFill: true},
          {removeUnusedNS: true},
          {cleanupIDs: true},
          {cleanupNumericValues: true},
          {cleanupListOfValues: true},
          {moveElemsAttrsToGroup: true},
          {moveGroupAttrsToElems: true},
          {collapseGroups: true},
          {removeRasterImages: true},
          {mergePaths: true},
          {convertShapeToPath: true},
          {sortAttrs: true},
          {removeDimensions: true},
          {removeAttrs: true},
          {removeElementsByAttr: false},
          {addClassesToSVGElement: false},
          {addAttributesToSVGElement: false},
          {removeStyleElement: false},
          {removeScriptElement: false},
        ]
      })
    ]))
    .pipe(gulp.dest('public/assets/img/icons'));
});

gulp.task('assets', gulp.parallel('videos', 'icons', 'images', 'fonts', 'copy:scripts', 'copy:styles:swiper', 'copy:styles', 'copy:styles:animate'));

gulp.task('clean',() => {
  return del('public');
});

// gulp.task('build', gulp.series(
//   'clean',
//   gulp.parallel('scripts', 'pug', 'styles', 'assets'))
// );

gulp.task('build', gulp.series(gulp.parallel('scripts', 'scripts:shop', 'pug', 'styles', 'styles:popup', 'styles:dynamic-banner', 'assets'))
);

gulp.task('watch', function () {
  gulp.watch('frontend/scripts/**/*.js', gulp.series('scripts', 'scripts:shop', 'copy:scripts'));
  gulp.watch('frontend/styles/**/*.scss', gulp.series('styles', 'styles:popup', 'styles:dynamic-banner'));
  gulp.watch('frontend/pug/**/*.pug', gulp.series('pug'));
  gulp.watch('frontend/assets/**/*.*', gulp.series('assets', 'pug'));
});

gulp.task('server', () => {
  browserSync.init({
    server: {
      baseDir: 'public'
    }
  });
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev', gulp.series('build', gulp.parallel('watch', 'server')));
