var gulp = require('gulp'),  // 引入 gulp
    // 引入组件
    del = require('del'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    cssMini = require('gulp-minify-css');

gulp.task('minicss', function() {
  return gulp.src('src/css/*.css')   //待压缩的css文件
             .pipe(cssMini())  // 使用gulp-minify-css组件执行代码压缩
             .pipe(rename(function (path) {
               path.basename += ".min";   // 具体请查看node_modules下的gulp-rename/README.md
               path.extname = ".css";
              }))  // 指定压缩后的名字
             .pipe(gulp.dest('dist/css'));  // 指定输出的目录，必须为目录
});

gulp.task('minijs', function(){
  return gulp.src('src/js/*.js')
             .pipe(jshint('.jshintrc'))   // JS代码校验
             .pipe(jshint.reporter('default'))
             .pipe(concat('all.js'))  // 合并所有JS文件到all.js中去
             .pipe(uglify())  // 压缩JS
             .pipe(rename(function (path) {
               path.basename += ".min";   // 具体请查看node_modules下的gulp-rename/README.md
               path.extname = ".js";
              }))  // 指定压缩后的名字
             .pipe(gulp.dest('dist/js'));
});

gulp.task('clean', function() {  // 自定义clean任务，清空dist文件夹下的文件
  del(['dist/**']).then(paths => {
    console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

gulp.task('default', ['minicss', 'minijs']);
