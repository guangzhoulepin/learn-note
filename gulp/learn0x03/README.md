#0x03

OK ~  看到这里，日常Gulp的一些使用也基本没问题了，要不我们来学习一些Gulp的理论吧

知道一些原理，那么其他Gulp组件用起来也是得心应手的 ~

###Show me the code...

据说，本周内有三个项目负责人请求他人接管，其中一个就是 [Grunt](https://github.com/gruntjs/grunt/issues/1403)，Grunt和Gulp太细节的对比还处于菜鸟的我也说不上来，但Gulp简单易上手的语法我觉得这是我更钟意于Gulp的主要原因吧，我猜这也是Gulp迅速占领市场的一大原因。

现在你应该可以不参考任何资料，随手写出一个Gulp任务了吗？

**实现功能：图片/html/css/js压缩、jade/sass/coffee编译、watch、livereload...**







如果你**还不可以毫不犹豫的回答 是**  的话，我觉得你最好再复习一下前面或自己再查找一些资料继续学习一下。



####gulp的API介绍
使用gulp，仅需知道4个API即可：<code>gulp.task()</code>,  <code>gulp.src()</code>,  <code>gulp.dest()</code>,  <code>gulp.watch()</code>， 所以很容易就能掌握，但有几个地方需理解透彻才行，我会在下面一一说明。为了避免出现理解偏差，建议先看一遍官方文档。

###gulp.src()
在介绍这个API之前我们首先来说一下Grunt.js和Gulp.js工作方式的一个区别。Grunt主要是以文件为媒介来运行它的工作流的，比如在Grunt中执行完一项任务后，会把结果写入到一个临时文件中，然后可以在这个临时文件内容的基础上执行其它任务，执行完成后又把结果写入到临时文件中，然后又以这个为基础继续执行其它任务...就这样反复下去。而在Gulp中，使用的是Nodejs中的stream(流)，首先获取到需要的stream，然后可以通过stream的pipe()方法把流导入到你想要的地方，比如Gulp的插件中，经过插件处理后的流又可以继续导入到其他插件中，当然也可以把流写入到文件中。所以Gulp是以stream为媒介的，它不需要频繁的生成临时文件，这也是Gulp的速度比Grunt快的一个原因。再回到正题上来，gulp.src()方法正是用来获取流的，但要注意这个流里的内容不是原始的文件流，而是一个虚拟文件对象流(Vinyl files)，这个虚拟文件对象中存储着原始文件的路径、文件名、内容等信息，这个我们暂时不用去深入理解，你只需简单的理解可以用这个方法来读取你需要操作的文件就行了。其语法为：

<code>gulp.src(globs[, options])</code>

globs参数是文件匹配模式(类似正则表达式)，用来匹配文件路径(包括文件名)，当然这里也可以直接指定某个具体的文件路径。当有多个匹配模式时，该参数可以为一个数组。

options为可选参数。通常情况下我们不需要用到。

 <code>* </code>   匹配文件路径中的0个或多个字符，但不会匹配路径分隔符，除非路径分隔符出现在末尾

 <code>** </code> 匹配路径中的0个或多个目录及其子目录,需要单独出现，即它左右不能有其他东西了。如果出现在末尾，也能匹配文件。

 <code>? </code> 匹配文件路径中的一个字符(不会匹配路径分隔符)

 <code>?(pattern|pattern|pattern) </code>匹配括号中给定的任一模式0次或1次，类似于js正则中的(pattern|pattern|pattern)?

 <code>+(pattern|pattern|pattern) </code> 匹配括号中给定的任一模式至少1次，类似于js正则中的(pattern|pattern|pattern)+

 <code>*(pattern|pattern|pattern) </code> 匹配括号中给定的任一模式0次或多次，类似于js正则中的(pattern|pattern|pattern)*

 <code>@(pattern|pattern|pattern) </code> 匹配括号中给定的任一模式1次，类似于js正则中的(pattern|pattern|pattern)

 <code>a/**b/z </code> 能匹配 a/b/z,a/sb/z,但不能匹配a/x/sb/z,因为只有单**单独出现才能匹配多级目录

 <code>**/*.js </code> 能匹配 foo.js,a/foo.js,a/b/foo.js,a/b/c/foo.js





###gulp.dest()
gulp.dest()方法是用来写文件的，其语法为：

<code>gulp.dest(path[,options])</code>

path 为写入文件的路径

options 为一个可选的参数对象，通常我们不需要用到

要想使用好gulp.dest()这个方法，就要理解给它传入的路径参数与最终生成的文件的关系。
gulp的使用流程一般是这样子的：首先通过gulp.src()方法获取到我们想要处理的文件流，然后把文件流通过pipe方法导入到gulp的插件中，最后把经过插件处理后的流再通过pipe方法导入到gulp.dest()中，gulp.dest()方法则把流中的内容写入到文件中，这里首先需要弄清楚的一点是，我们给gulp.dest()传入的路径参数，只能用来指定要生成的文件的目录，而不能指定生成文件的文件名，它生成文件的文件名使用的是导入到它的文件流自身的文件名，所以生成的文件名是由导入到它的文件流决定的，即使我们给它传入一个带有文件名的路径参数，然后它也会把这个文件名当做是目录名，例如：
```javascript
var gulp = require('gulp');

gulp.src('src/lib/jquery.js')
    .pipe(gulp.dest('dist/lib/foo.js'));
//最终生成的文件路径为 dist/lib/foo.js/jquery.js,而不是dist/lib/foo.js

```

```javascript
var gulp = require('gulp');

gulp.src('src/js/*.js')  //没有配置base参数，此时默认的base路径为src/lib
    // 假设匹配到jQuery.js
    .pipe(gulp.dest('dist/js')); //生成的文件路径为 dist/js/jQuery.js


gulp.src('src/js/*.js', {base:'script'}) // 配置了base参数，此时base路径为src
    // 假设匹配到jQuery.js
    .pipe(gulp.dest('dist/js')); //此时生成的文件路径为 dist/js/jQuery.js

```


###gulp.task()
gulp.task方法用来定义任务，内部使用的是Orchestrator，其语法为：

<code>gulp.task(name[, deps], fn)</code>

name  为任务名
deps  是当前定义的任务需要依赖的其他任务，为一个数组。当前定义的任务会在所有依赖的任务执行完毕后才开始执行。如果没有依赖，则可省略这个参数
fn   为任务函数，我们把任务要执行的代码都写在里面。该参数也是可选的。

```javascript
gulp.task('mytask', ['one', 'two', 'three', 'four'], function { //定义一个有依赖的任务
  // do something
});

```

如果任务相互之间没有依赖，任务会按你书写的顺序来执行，如果有依赖的话则会先执行依赖的任务。但是，

上面的例子中我们执行two任务时，会先执行one任务，但不会去等待one任务中的异步操作完成后再执行two任务，而是紧接着执行two任务。所以two任务会在one任务中的异步操作完成之前就开始执行了。



###gulp.watch()
<code>gulp.watch() </code> 用来监视文件的变化，当文件发生变化后，我们可以利用它来执行相应的任务，例如文件压缩等。其语法为:

<code>gulp.watch(glob[, opts], tasks)</code>

glob 为要监视的文件匹配模式，规则和用法与gulp.src()方法中的glob相同。

opts 为一个可选的配置对象，通常不需要用到

tasks 为文件变化后要执行的任务，为一个数组


```javascript
gulp.task('uglify',function{
  // js 压缩
});
gulp.task('gls',function{
  // gulp-live-server...
});
gulp.watch('js/**/*.js', ['uglify','gls']);

```



---
###总结

[自动加载插件:  gulp-load-plugins](https://github.com/jackfranklin/gulp-load-plugins)

[重命名:  gulp-rename](https://github.com/hparra/gulp-rename)

[js文件压缩:  gulp-uglify](https://github.com/terinjokes/gulp-uglify)

[css文件压缩:  gulp-minify-css](https://github.com/murphydanger/gulp-minify-css)

[html文件压缩:  gulp-minify-html](https://github.com/murphydanger/gulp-minify-html)

[js代码检查:  gulp-jshint](https://github.com/spalger/gulp-jshint)

[文件合并:  gulp-concat](https://github.com/contra/gulp-concat)

[less编译:  gulp-less](https://github.com/plus3network/gulp-less)

[sass编译:  gulp-sass](https://github.com/dlmanning/gulp-sass)

[图片压缩:  gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)

[自动刷新:  gulp-livereload](https://github.com/vohof/gulp-livereload)

[静态服务器+刷新:  gulp-live-server](https://github.com/gimm/gulp-live-server)



