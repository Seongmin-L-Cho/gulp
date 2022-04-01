import gulp from "gulp";
import gpug from "gulp-pug";
import del from "del";
import ws from "gulp-webserver";
import image from "gulp-image";

const routes = {
  pug: {
    watch: "src/**/*.pug",// 컴파일 할거 전체 관찰
    src: "src/*.pug",
    dest: "build"
  },

  img: {
    src: "src/img/*",
    dest: "build/img"
  }
};

export const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

    const clean = () => del(["build/"]);

    const webserver = () =>
      gulp.src("build").pipe(ws({ livereload: true, open: true }));

      const prepare = gulp.series([clean, img]);    // package.json 에 있는 거만 export 해주면 됨
    const assets = gulp.series([pug]);
    
    const img = () =>
    gulp
      .src(routes.img.src)
      .pipe(image())
      .pipe(gulp.dest(routes.img.dest));

    const watch = () => {
      gulp.watch(routes.pug.watch, pug);
      gulp.watch(routes.img.src, img);
    };
    

    

    const live = gulp.parallel([webserver, watch]);
    export const dev = gulp.series([prepare, assets, live]);
