var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var jekyll = require('gulp-jekyll');
var runSequence = require('run-sequence');
var process = require('child_process');
var imgmin = require('gulp-imagemin');
var changed = require('gulp-changed');


var config = {
  sass: './src/sass/style.scss',
  images: './src/assets/unop-images/*.{png,jpg,jpeg,svg}',
  build: './_site/'
}

gulp.task('images', function(){
  return gulp.src(config.images)
  .pipe(changed(config.build + '/assets'))
  .pipe(gulp.dest('./src/assets/images'));
});

gulp.task('sass', function(){
  return gulp.src(config.sass)
  .pipe(sass({
    style: 'expanded'
  }))
  .pipe(prefix({
    browsers: ['last 2 versions'],
    cascade: true
  }))
  .pipe(csso())
  .pipe(gulp.dest('./src/css'));
});

gulp.task('jekyll', function(){
  return gulp.src(['./src/*.{html,md,.xml}','./src/_layouts','./src/_posts/*.{html,md,markdown}'])
  .pipe(jekyll({
    source: './src/',
    destination: config.build
  }))
  .pipe(gulp.dest(config.build));
});

gulp.task('jekyll-build', function(cb){
  process.spawn('jekyll', ['build', '-d', '_site', '-s', 'src'], {stdio: 'inherit'});
});

gulp.task('build', function(){
  runSequence(['sass','images'],'jekyll-build');
});

gulp.task('watch', function(){
  gulp.start('sass');
  gulp.watch('./src/sass/**/*.scss', ['sass']);
  //gulp.watch('./src/**/*.{html,md,markdown}', ['jekyll-build']);
});
