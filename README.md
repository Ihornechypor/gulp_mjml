# MJML Gulp Starter project

## Introduction

### MJML Starter for Email coding with Gulp, BrowserSync.
This project is designed for those who prefer not to use the native MJML application. It consolidates various plugins to facilitate the use of MJML language within a Gulp workflow. Additionally, support for *SCSS* has been integrated, and image optimization is achieved through *gulp-imagemin*.


### This starter uses these tools :
- [MJML](https://mjml.io/) 4 processor for gulp (gulp-mjml),
- **BrowserSync**;
- **gulp-imagemin**;
- **SCSS**;
- **MJML**


### Requirements
- [NodeJS](https://nodejs.org/en/)



## Installation

```bash
$ git clone https://github.com/Ihornechypor/gulp_mjml_starter mjml_gulp_starter
```

Alternatively, download the files from this repository and navigate to the folder in your command line.

```bash
$ cd mjml_gulp_starter
$ npm install
```

## Develop
Run `npm run dev` to initiate the development process with BrowserSync.
```bash
$ npm run dev
```

### Build
Run `npm run build` to prepare the code for production with BrowserSync. This will remove the dist folder, create new templates, and optimize images.
```bash
$ npm run build
```

### SCSS 
MJML lacks native support for SCSS. To address this, two components, namely *headStyleForInject.mjml* and *headStyleNew.mjml*, have been created in the *src/components/* folder. In *headStyleForInject.mjml*, the **`<styleInline></styleInline>`** custom tag is automatically replaced with CSS from the *src/assets/scss/styles_inline.scss* file. Additionally, there is a custom tag **`<styleResponsive></styleResponsive>`** that incorporates styles from the *src/assets/scss/styles_responsive.scss* file.
Also you need to create two types of scss files one for responsive css, and one for inline css, and then add them separetelly to **styles_inline.scss** file and **styles_responsive.scss**. 
**Don't rename this scss files** or if you rename them, just remember to shange them in *gulpfile.mjs*.
*(I will refactor this fiels  in the next iteration, so will not need to create separate files for responsive and inline)*


### Images
All images should be placed in the *src/mails/img/source/* folder. Files from this folder will be relocated to *dist/mails/img/opti/*, and an */opti/* folder will be added inside *src/mails/img/* to enable building the project using the VS Code build MJML plugin within the *src/mails/* folder.