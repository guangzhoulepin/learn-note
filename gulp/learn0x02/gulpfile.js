var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    css = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imgmin = require('gulp-imagemin'),
    prefixer = require('gulp-autoprefixer'),
    gls = require('gulp-live-server');

var server = gls.static('dist', 8888);  // 指定监听服务端口，默认是根目录的public目录下，端口3000

gulp.task('watch', ['build', 'server'], function() {
  gulp.watch('src/css/*.css', ['css']);

  gulp.watch('src/js/**/*.js', ['js']);

  gulp.watch(['src/fonts/**/*', 'src/imgs/**/*'], ['static']);

  gulp.watch(['dist/**/*'], function() {
    server.notify.apply(server,arguments);
  })
});

gulp.task('server', function() {
  server.start();   // 必须启动 start 开启服务， notify才有效
});

gulp.task('build', ['css', 'js', 'static']);

gulp.task('css', function() {
  return gulp.src('src/css/*.css')
             .pipe(prefixer({
                         browsers: ['> 5%']
                  }))
             .pipe(css())
             .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
  return gulp.src('src/js/**/*.js')
             .pipe(uglify())
             .pipe(gulp.dest('dist/js'));
});

gulp.task('imgmin', function() {
  return gulp.src('src/imgs/**/*')
             .pipe(imgmin({          // 压缩图片
                 progressive: true,  // for jpg
                 interlaced: true,   // for gif
                 multipass: true     // for svg
               }))
             .pipe(gulp.dest('dist/imgs'));
});

gulp.task('static', ['imgmin'], function() {
  return gulp.src('src/fonts/**/*')
             .pipe(gulp.dest('dist/fonts'));
});

gulp.task('default', ['watch'], function() { // task名字是default的话，直接执行gulp即相当于gulp default
  console.log('watching and listening at port:　8888...');
});
