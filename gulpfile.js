const {series, src, dest, parallel, watch} = require('gulp')
const mjml = require('gulp-mjml')
const browserSync = require('browser-sync').create();


const config = {
    dest: "./dist/",
    src: "./src/",
    mailsExt: '*.mjml',
    mailsFolder: './src/mails/**/*.mjml'
}

const build = (done) => {
  src(config.mailsFolder, {"allowEmpty": true})
    .pipe(mjml())
    .pipe(dest(`${config.dest}`))
    .pipe(browserSync.stream())
  done();
}

const watcher = () => { 
  browserSync.init({
    server: config.dest
  })
  watch(`${config.src}**/*.*`, build);
};


exports.build = build;
exports.watcher = watcher;

exports.default = parallel(build);
exports.watcher = parallel(watcher);