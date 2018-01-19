var gulp = require('gulp');
var install = require('gulp-install');
var ext_replace = require('gulp-ext-replace');
var jsonModify = require('gulp-json-modify');
var run = require('gulp-run-command').default;
var jeditor = require("gulp-json-editor");

function copyFiles() {
  console.log('copy package.json file...');
  gulp.src(['*.json']).pipe(gulp.dest('dist/'));
  gulp.src(['domains/Customer/Models/*.json']).pipe(gulp.dest('dist/domains/Customer/Models/'));
  gulp.src(['domains/Integration/Models/*.json']).pipe(gulp.dest('dist/domains/Integration/Models/'));
  gulp.src(['domains/Purchasing/Models/*.json']).pipe(gulp.dest('dist/domains/Purchasing/Models/'));
  gulp.src(['domains/System/Models/*.json']).pipe(gulp.dest('dist/domains/System/Models/'));
  gulp.src(['server/static/*']).pipe(gulp.dest('dist/server/static'));

  console.log('copy example file...');
  gulp.src(['server/*.example']).pipe(ext_replace('')).pipe(gulp.dest('dist/server/'));

  console.log('copy config file...');
  gulp.src(['server/*.json']).pipe(gulp.dest('dist/server/'));
}

function editFiles() {
  console.log('edit datasources...');
  gulp.src("dist/server/datasources.json")
  .pipe(jsonModify({ key: 'db.host', value: '172.16.17.18' }))
  .pipe(gulp.dest('dist/server/'))

  //gulp.src("dist/server/datasources.json")
  //.pipe(jeditor(function(json) {
  //  json.db.host = "172.16.17.18";
  //  return json; // must return JSON object.
  //}))
  // .pipe(gulp.dest("dist/server/"));
}

function editTSconfigFiles() {
  console.log('edit tsconfig...');
  gulp.src("tsconfig.json")
  .pipe(jsonModify({ key: 'compilerOptions.sourceMap', value: 'false' }))
  .pipe(jsonModify({ key: 'compilerOptions.outDir', value: 'dist' }))
  .pipe(gulp.dest('./'))
}

function installModules() {
  console.log('install node_modules...');
  return gulp.src(['./package.json'])
  .pipe(gulp.dest('./dist/'))
  .pipe(install());
}

gulp.task('editTSconfigFiles', editTSconfigFiles);
gulp.task('build',['editTSconfigFiles'], run('ntsc'));
gulp.task('copyFiles',['build'], copyFiles);
gulp.task('installModules', ['copyFiles'], installModules);
gulp.task('editFiles', ['installModules'], editFiles);
gulp.task('default', ['editTSconfigFiles', 'build', 'copyFiles', 'editFiles', 'installModules']);
