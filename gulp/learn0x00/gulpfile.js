var gulp = require('gulp'),  // 需要在一开始添加依赖项
    jsMini = require('gulp-uglify');  // 这个是JS压缩的模块，需要引用进来

gulp.task('minijs', function() {
  return gulp.src('src/js/*.js')
             .pipe(jsMini())
             .pipe(gulp.dest('dist/js'));
});
