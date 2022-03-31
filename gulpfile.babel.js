import gulp from "gulp";
import gpug from "gulp-pug";

const routes = {
  pug: {
    watch: "src/**/*.pug",// 컴파일 할거 전체 관찰
    src: "src/*.pug",
    dest: "build"
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

    const prepare = gulp.series([clean]);
    // package.json 에 있는 거만 export 해주면 됨
    const assets = gulp.series([pug]);
    
    const watch = () => {
      gulp.watch(routes.pug.watch, pug);
    };
    

    const postDev = gulp.series([webserver, watch]);
    export const dev = gulp.series([prepare, assets, postDev]);