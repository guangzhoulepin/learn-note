#0x02

看了前面两篇简单的入门实践，现在已经基本有个概念了吧。


这次我们来实现一个简单的自动刷新的任务，即你静态文件的修改即刻同步到浏览器，
不用按F5再来看效果了，对于双显的小伙伴用起来一定非常爽...


```javascript
var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'), // 用于资源定位
    css = require('gulp-minify-css'),   // 压缩CSS
    uglify = require('gulp-uglify'),    // 压缩JS
    imgmin = require('gulp-imagemin'),  // 压缩图片
    prefixer = require('gulp-autoprefixer'),  // 用于兼容浏览器，自动添加后缀
    gls = require('gulp-live-server');  // 实时刷新

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
                         browsers: ['> 5%']    // [具体参数可查看](https://github.com/ai/browserslist#queries)
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

```

更多参考资料：

[Gulp-book: https://github.com/nimojs/gulp-book](https://github.com/nimojs/gulp-book)

[Gulp自动化裁剪图片: http://geek100.com/2684/](http://geek100.com/2684/)
