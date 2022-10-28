const { src, dest, watch, parallel, series } = require('gulp');

const scss  = require('gulp-sass')(require('sass'));
//конкатинирует файлы
const concat = require('gulp-concat');
//автоматически обновляет страницу
const browserSync = require('browser-sync').create();
//минифицирует js
const uglify = require('gulp-uglify-es').default;
//для поддержки более старых версий
const autoprefixer = require('gulp-autoprefixer');

const imagemin = require('gulp-imagemin');
const del = require('del');
const webpackStream = require('webpack-stream');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        },
        open: false
    });
}

function scripts() {
    return src('./src/js/main.js')
        .pipe(uglify())
        .pipe(webpackStream({
            mode: 'development',
            output: {
                filename: './main.min.js'
            }
        }))
        .pipe(dest('./dist/js/'))
        .pipe(browserSync.stream())
}

function styles() {
    return src('./src/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('./dist/css'))
        .pipe(browserSync.stream())
}

function html() {
    return src('./src/*.html')
        .pipe(dest('./dist/'))
        .pipe(browserSync.stream())
}

function images() {
    return src('src/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('./dist/images/'))
}

function fonts() {
    return src('src/fonts/**/*.*')
        .pipe(dest('./dist/fonts/'))
}

function watching() {
    watch(['src/scss/**/*.scss'], styles);
    watch(['src/js/**/*.js'], scripts);
    watch(['src/*.html'], html);
}

function cleanDist() {
    return del('dist')
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.html = html;
exports.fonts = fonts;

exports.build = series(cleanDist, images);
exports.default = parallel(fonts, html, styles, scripts, browsersync, watching);
