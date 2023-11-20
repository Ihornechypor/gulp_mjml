import gulp from 'gulp';
const { series, task, src, dest, watch } = gulp;
import mjml from 'gulp-mjml';
import imagemin from 'gulp-imagemin'
import browserSync from 'browser-sync';
import newer from 'gulp-newer';
import {deleteAsync} from 'del';
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import replace from 'gulp-replace';
import rename  from 'gulp-rename';
import fs from 'fs'

const config = {
  dest: "./dist/",
  src: "./src/",
  inject: "./src/components/headStyleForInject.mjml",
  injected: "./src/components/",
  mailsFolder: './src/mails/**/*.mjml',
  mailsComponentsFolder: './src/components/**/*.mjml',
  imgFolder: './src/mails/img/source/**/*.{jpg,png,gif}',
  imgFolderDest: './dist/mails/img/opti/',
  imgFolderOpti: './src/mails/img/opti/',
  cssFolderDest: './dist/assets/css/',
  cssFileInjectInline: './dist/assets/css/styles_inline.css',
  cssFileInjectResponsive: './dist/assets/css/styles_responsive.css',
  scssFiles: './src/assets/scss/*.scss',
  scssFolder: './src/assets/scss/**/*.scss'
}

const cleanFolders = () => deleteAsync([config.dest, config.cssFolderDest, config.imgFolderOpti]);


const injectCss = (done) => {
  const target = src(config.inject);

  const styleInline = fs.readFileSync(config.cssFileInjectInline).toString();
  const styleResponsive = fs.readFileSync(config.cssFileInjectResponsive).toString();
  
  target.pipe(replace('<styleInline></styleInline>', `${styleInline}`))
        .pipe(replace('<styleResponsive></styleResponsive>', `${styleResponsive}`))
        .pipe(rename('headStyleNew.mjml'))
        .pipe(dest(config.injected))
  done && done()
} 

const buildSass = (done) => {
  src(config.scssFiles, {"allowEmpty": true})
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.cssFolderDest)).on('end', () => injectCss())
    .pipe(browserSync.stream())
  done && done();
}


const img = (done) => {
  src(config.imgFolder, {"allowEmpty": true})
    .pipe(newer(config.imgFolderDest))
    .pipe(imagemin({
      verbose: true
    }))
    .pipe(dest(`${config.imgFolderDest}`))
    .pipe(dest(`${config.imgFolderOpti}`))
    .pipe(browserSync.stream())
  done && done();
}


const buildMjml = (done) => {
  src(config.mailsFolder, {"allowEmpty": true})
    .pipe(mjml())
    .pipe(dest(`${config.dest}/mails/`))
  browserSync.reload()
  done && done();
}

const watcher = () => { 
  browserSync.init({
    server: {
      baseDir: `${config.dest}`,
    },
    port: 3000,
  })
  watch(config.imgFolder, img);
  watch(config.scssFolder, buildSass);
  watch([config.mailsFolder, config.mailsComponentsFolder], buildMjml);
};

task('build', series(cleanFolders,buildSass,img,buildMjml,watcher))
task('serve', series(buildSass,img,buildMjml,watcher))