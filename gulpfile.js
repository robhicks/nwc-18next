const babel = require('rollup-plugin-babel');
const del = require('del');
const gulp = require('gulp');
const nodeResolve = require('rollup-plugin-node-resolve');
const rollup = require('rollup').rollup;
const uglify = require('rollup-plugin-uglify');

let es5Cache, esNextCache;

gulp.task('build:es5', () => rollup({
  cache: es5Cache,
  entry: './src/nwc-i18next.js.js',
  external: [],
  plugins: [
    babel(),
    uglify()
  ]
}).then((bundle) => {
  cache = bundle;
  return bundle.write({
    format: 'iife',
    moduleName: 'nwcI18next',
    dest: './nwc-18next.min.js',
    sourceMap: true
  })
}));

gulp.task('build:esNext', () => rollup({
  cache: esNextCache,
  entry: './src/nwc-i18next.js',
  external: [],
  plugins: [
  ]
}).then((bundle) => {
  cache = bundle;
  return bundle.write({
    format: 'es',
    dest: './nwc-18next.js'
  })
}));

gulp.task('watch', () => {
  return gulp.watch(['./src/**/*.*'], gulp.parallel('build:es5', 'build:esNext'));
});

gulp.task('default', gulp.series(gulp.parallel('build:es5', 'build:esNext'), 'watch'));
