#0x00

[Gulp](http://www.gulpjs.com.cn/)是一个构建系统，开发者可以使用它在网站开发过程中自动执行常见任务。Gulp是基于Node.js构建的，因此你需要先配置好[Node.js](https://nodejs.org/en/)环境。


##Install
首先搭建好Node.js环境...


**Windows/Mac**

[https://nodejs.org/download/](https://nodejs.org/download/)


**Linux (Debian Based)**
```javascript
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
sudo chown -R $(whoami) ~/.npm
```

##Commands

Run Node.js REPL =>  <code> node </code>

Install Package =>   <code> npm install packageName </code>

Create a package.json automatically =>  <code> npm init </code>

Install node_modules when a package.json is in the same folder =>
<code> npm install </code>


##Before
安装好Node.js环境后你还需要在全局安装<code>gulp</code>


<code>npm install -g gulp </code>

**or in Unix**
<code> sudo npm install -g gulp </code>

##After
若文件中已经存在<code>package.json</code>文件，你只需要<code>npm install</code>就可以自动安装所有依赖...(因为我已经配置好了package.json，如果你要尝试，可以npm init 自动化配置一下)

若没有package.json文件，需要<code>npm init </code>自动生成package.json文件，然后在该文件的<code>dependencies </code>键下添加你需要的依赖，或者直接在命令行中安装依赖，然后添加到dependencies 键下，注意要加<code> --save </code>参数，然后它会自动添加到dependencies键下，如： <code>npm install --save gulp</code>.

**注意：** 使用gulp需要全局和本地都安装gulp

关于<code>package.json</code>的一些参数[可点击这里了解](http://javascript.ruanyifeng.com/nodejs/packagejson.html)

[更深入了解可参考npm官方文档：https://docs.npmjs.com](https://docs.npmjs.com/files/package.json)

##Show
> Talk is CHEAP, Show me the CODE!

***先来个简单的代码段吧，实现功能：JS压缩***

在根目录中创建一个<code>gulpfile.js</code> 文件：
```javascript
var gulp = require('gulp'),  // 需要在一开始添加依赖项
    jsMini = require('gulp-uglify');  // 这个是JS压缩的模块，需要引用进来

gulp.task('minijs', function() {  // minijs这个是任务名字，可自定义
  return gulp.src('src/js/*.js')  // 指定需要压缩的JS文件，支持glob语法进行匹配文件
             .pipe(jsMini())  // 压缩JS，如果你知道*nix管道的话，pipe的意思就不用在这里解释了
             .pipe(gulp.dest('dist/js'));  // 输出必须是目录，若你需要压缩后重命名文件，可用gulp-rename
});
```
[点我了解node-glob语法](https://github.com/isaacs/node-glob)

OK~   现在我们来开始执行 gulp 任务吧

在gulpfile.js文件根目录下执行命令 => **gulp miniJS**




