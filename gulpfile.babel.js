import gulp from "gulp";
import gpug from "gulp-pug";

const routes = {
  pug: {
    src: "src/*.pug",
    dest: "build"
  }
};

export const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

    const clean = () => del(["build"]);

    const prepare = gulp.series([clean]);
    // package.json 에 있는 거만 export 해주면 됨
    const assets = gulp.series([pug]);
    
    export const dev = gulp.series([prepare, assets]);