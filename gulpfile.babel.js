import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";
import sass from "gulp-sass";

sass.compiler = require("node-sass");

const routes = {
  pug: {
    watch: "src/**/*.pug",// 컴파일 할거 전체 관찰
    src: "src/*.pug",
    dest: "build"
  },

  img: {
    src: "src/img/*",
    dest: "build/img"
  },
  scss: {
    watch: "src/scss/**/*.scss",
    src: "src/scss/style.scss",
    dest: "build/css"
  }
};

export const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

    const clean = () => del(["build/"]);

    const webserver = () => gulp.src("build").pipe(ws({ livereload: true }));

      const prepare = gulp.series([clean, img]);    // package.json 에 있는 거만 export 해주면 됨
    
    const img = () =>
    gulp
      .src(routes.img.src)
      .pipe(image())
      .pipe(gulp.dest(routes.img.dest));


      const styles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(routes.scss.dest));


    const watch = () => {
      gulp.watch(routes.pug.watch, pug);
      gulp.watch(routes.img.src, img);
      gulp.watch(routes.scss.watch, styles);

    };
    
    const assets = gulp.series([pug, styles]);

    

    const live = gulp.parallel([webserver, watch]);
    export const dev = gulp.series([prepare, assets, live]);
