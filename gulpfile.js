let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync').create();
let concat = require('gulp-concat');//для конкатенации (объединения) файлов
let uglify = require('gulp-uglifyjs');//для сжатия файлов js
let cssnano = require('gulp-cssnano');//для сжатия css файлов
let rename = require('gulp-rename');//переименование css (добавление префикса min)
let del = require('del');//подключаем библиотеку для удаления файлов и папок
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');
let cache = require('gulp-cache');//Подключаем cache
let autoprefixer = require('gulp-autoprefixer');//Подключаем autoprefixer
let babel = require('gulp-babel');//Подключаем babel ( babel - это транспайлер, переписывающий код на ES-2015(ES6) в код на предыдущем стандарте ES5.


gulp.task('serve', ['cssmin', 'js'], function() {
    
    browserSync.init({
        server: {
            baseDir: "app"
        }
    });
    
    
    gulp.watch("app/sass/**/*.scss", ['cssmin']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/js/libs.js", ['js-watch']);
    
});


//sass task

gulp.task('sass', function(){
  return gulp.src(['app/sass/main.scss'])//берем файл scss
  .pipe(sass())//применяем плагин gulp-sass(т.е. преобразуем наш SCSS в CSS)
  .pipe(autoprefixer(['last 15 versions', '>1%',], {cascade: true}))
  .pipe(gulp.dest('app/css'))//помещаем результат преобразования в данную директорию
  
});

//css task

gulp.task('cssmin',['sass'], function(){
  return gulp.src('app/css/main.css')//выбираем файл для минификации
  .pipe(cssnano())//сжимаем
  .pipe(rename({suffix:'.min'}))//добавляем суффикс min
  .pipe(gulp.dest('app/css'))//выгружаем его в заданную директорию
  .pipe(browserSync.stream())//обновляем СSS на странице
});


// js task

gulp.task('js', function () {
    
    return gulp.src(['node_modules/jquery/dist/jquery.js','node_modules/bootstrap/dist/js/bootstrap.js', 'node_modules/swiper/js/swiper.js', 'app/js/libs.js'])
        //.pipe(browserify())
       .pipe(concat('libs.min.js'))//собираем их в один файл libs.min.js
        .pipe(babel({
            presets: ['@babel/env'],
			compact: false //переписывает код с ES6 на ES5;
            }))
        .pipe(uglify())//сжимаем его
        .pipe(gulp.dest('app/js'));
});

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

//img min task

gulp.task('img', function(){
  return gulp.src('app/img/**/*')//берем все файлы из папки img
  //сжимаем изображения с наилучшим качеством
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgPlugins: [{remomveViewBox: false}],
    use: [pngquant()]
  })))
  //выгружаем в продакшен в папку img
  .pipe(gulp.dest('dist/img'));
});

//task удаления папки dist

gulp.task('clean', function(){
  return del.sync('dist');//удаляем папку dist перед сборкой
});

//build

gulp.task('build', ['clean', 'img'], function(){
  //переносим css стили в папку продакшена
  let buildCss = gulp.src('app/css/**/*.css')
  .pipe(gulp.dest('dist/css'))
  //переносим шрифты в папку продакшена
  let buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
  //переносим webfonts
  let webFonts = gulp.src('app/webfonts/**/*')
  .pipe(gulp.dest('dist/webfonts'))
  //переносим скрипты в папку продакшена
  let buildJs = gulp.src('app/js/**/*')
  .pipe(gulp.dest('dist/js'))
  //переносим index в папку продакшена
  let buildHtml = gulp.src('app/*.html')
  .pipe(gulp.dest('dist'));
});





gulp.task('default', ['serve']);