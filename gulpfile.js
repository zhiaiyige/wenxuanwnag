// 目标 : 目标就是 把scss转换成css ; 代码压缩 ; 添加代码的前缀; 
// - scss : scss => css
// - minscss : scss => css => 压缩 => 添加前缀; 

var gulp = require("gulp");
// sass功能的驱动  
var sass = require("gulp-sass");
    sass.compiler = require("sass");

var cssmin = require("gulp-cssmin");
var autoprefixer = require("gulp-autoprefixer");
var rename = require("gulp-rename");
var fileinclude = require("gulp-file-include");
var babel  = require("gulp-babel");
var uglify = require('gulp-uglify');
var connect = require("gulp-connect");
var del  = require("del");
// 把压缩之后的代码加上哈希值; 
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');


// scss配置; 

// 指令 : scss 
gulp.task("scss" , function( next ){
      // 找到所有的scss文件; 

      gulp.src(["./src/scss/*.scss"])
      .pipe(sass().on("error",sass.logError))
      .pipe(gulp.dest("./dist/css/"))
      .pipe(connect.reload());

      next();
});

// 指令 ： minscss
gulp.task("minscss" , function( next ){
      // 找到所有的scss文件; 
      gulp.src(["./src/scss/*.scss"])
      .pipe(sass().on("error",sass.logError))
      .pipe(autoprefixer({
            overrideBrowserslist : ["last 2 versions"]
      }))
      .pipe(cssmin())
      // .pipe(rename({
      //       suffix: "-min",
      // }))
      .pipe(rev())
      .pipe(gulp.dest("./dist/css/"))
      .pipe(rev.manifest())
      .pipe(gulp.dest("./rev/css"))
     
      next();
});

// 配置html; 

// 1. 把所有的html放入到dist（生产文件夹之中）;

gulp.task("minhtml" , function(next){

      gulp.src(['rev/**/*.json',"./src/*.html"])
      .pipe(fileinclude({
            // 识别的语法前缀
            prefix: '@@',
            basepath: '@file'
      }))
      .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                  'css': 'css',
                  '/javascripts/': 'javascripts/',
                  'cdn/': function(manifest_value) {
                        return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                  }
            }
      }))
      .pipe(gulp.dest("./dist/"))
      .pipe(connect.reload());

      next();
});


gulp.task("html" , function(next){

      gulp.src(["./src/*.html"])
      .pipe(fileinclude({
            // 识别的语法前缀
            prefix: '@@',
            basepath: '@file'
      }))
      .pipe(gulp.dest("./dist/"))
      .pipe(connect.reload());

      next();
});

// js处理 

// - ES6 => ES5 ;  gulp-babel 
// - 代码压缩;     gulp-uglify 

// 如果部分代码写的不规范，那么容易让我们的uglify报错; 
// 无法正确的压缩js代码; 
// 遇到这种情况直接放弃到压缩代码就可以了; 

gulp.task("js" , function( next ){
      gulp.src(["./src/javascripts/*.js"])
      .pipe( babel({
            presets : ['@babel/env']
      }))
      .pipe(gulp.dest("./dist/javascripts"))
      .pipe(connect.reload());

      next();
});

gulp.task("minjs" , function( next ){
      gulp.src(["./src/javascripts/*.js"])
      .pipe( babel({
            presets : ['@babel/env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest("./dist/javascripts"));
      next();
});

// 依赖处理; 

gulp.task("libs" , function(next){
      gulp.src(["./src/libs/**/*"])
      .pipe(gulp.dest("./dist/libs"));

      gulp.src(["./src/scss/font/**/*"])
      .pipe(gulp.dest("./dist/css/font"));

      gulp.src(["./src/images/**/*"])
      .pipe(gulp.dest("./dist/images/"));

      next();
});

// 服务器指令; 
gulp.task("webserver" , function(next){
      connect.server({
            // 设置根目录; 
            root : "./dist",
            livereload: true
      });

      next();
});

// 监听指令; 
gulp.task("watch" , function( next ){

      gulp.watch(["./src/*.html"],gulp.series("html"));
      gulp.watch(["./src/scss/*.scss"],gulp.series("scss"));
      gulp.watch(["./src/javascripts/*.js"],gulp.series("js"));
      gulp.watch(["./src/libs/**/*","./src/scss/**/*"],gulp.series("libs"));

      next();
});

gulp.task("clearDist" , async function(){
      await del.sync(['dist/**']);
});


// 目标 : 把我们开发环境之中的代码，放到dist发布目录之中进行测试或者发布; 

// 创建合并指令;

exports.init = gulp.series("scss","html","js","libs");

// 开启测试服务器; 
// default 指令是不用输入指令名称的直接输入 gulp 就可以直接启动;  
exports.default = gulp.series("clearDist" , "scss","html","js","libs" , gulp.parallel("watch","webserver"));

// 打包指令,把我们代码的最优状态打包之后放入到dist之中; 
exports.build = gulp.series("clearDist","minscss","minhtml","minjs","libs");
