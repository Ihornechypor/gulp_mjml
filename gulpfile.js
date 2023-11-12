const {series, src, dest } = require('gulp')
const mjml = require('gulp-mjml')
const mjmlEngine = require('mjml')


const config = {
    dest: "./dist/",
    src: "./src/",
    mailsFolder: "./mails/",
}

const build = (done) => {
  src(`${config.src}/${config.mailsFolder}/*.mjml`)
    .pipe(mjml())
    .pipe(dest(`${config.dest}`))
  done();
}

exports.build = build;
exports.default = series(build);