var gulp = require("gulp"),
    connect= require("gulp-connect"),
    browserify= require("gulp-browserify"),
    concat=require("gulp-concat"),
    port=process.env.port || 5000;
gulp.task("browserify",function(){
    gulp.src('./app/js/main.js')
        .pipe(browserify({
            transform:'reactify'
        }))
        .pipe(gulp.dest('./dist/js'))
});
//livereload
gulp.task("server", function () {
    connect.server({
        root:'./',//服务器的根目录
        port:port,//服务器的地址，没有此配置是8080
        livereload:true
    })
});
gulp.task("copy-js", function () {
    gulp.src('./dist/**/*.js')
        .pipe(connect.reload())
});
gulp.task("copy-html", function () {
    gulp.src('./app/**/*.html')
        .pipe(connect.reload())
});
gulp.task("watch", function () {
    gulp.watch("./dist/**/*.js",["copy-js"]);
    gulp.watch("./app/**/*.html",["copy-html"]);
    gulp.watch("./app/**/*.js",["browserify"]);
})
gulp.task("default",["browserify"]);
gulp.task("serve",["browserify","server","watch"]);
