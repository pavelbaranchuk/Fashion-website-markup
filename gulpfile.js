var gulp = require("gulp");
var browserSync = require("browser-sync").create();
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var rename = require("gulp-rename");

gulp.task("serve", ["sass"], function() {
  browserSync.init({
    server: "./",
    ui: false,
    port: 3000,
    open: false
  });
  gulp.watch(["./scss/*.scss", "./scss/*/*.scss"], ["sass"]);
  gulp.watch("./*.html").on("change", browserSync.reload);
});

gulp.task("sass", function() {
  return gulp
    .src("./scss/*.scss")
    .pipe(sass({ outputStyle: "expanded" }).on("error", sass.logError))
    .pipe(postcss([autoprefixer({ browsers: ["last 2 versions"] })]))
    .pipe(rename("style.css"))
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
});

gulp.task("default", ["serve"]);
