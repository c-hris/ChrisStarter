var gulp         = require('gulp');
var sass         = require('gulp-sass');
var browserSync  = require('browser-sync');
var prefix       = require('gulp-autoprefixer');
var plumber      = require('gulp-plumber');
var uglify       = require('gulp-uglify');
var rename       = require("gulp-rename");
var imagemin     = require("gulp-imagemin");
var pngquant     = require('imagemin-pngquant');
var messages     = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll.bat', ['build'], {stdio: 'inherit'}).on('close', done);

});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});
/**
*
* Styles
* - Compile
* - Compress/Minify
* - Catch errors (gulp-plumber)
* - Autoprefixer
*
**/
gulp.task('sass', function() {
  gulp.src('assets/css/main.sass')
  .pipe(sass({
            includePaths: ['sass'],
            onError: browserSync.notify
        }))
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
  .pipe(gulp.dest('_site/assets/css'))
  .pipe(plumber())
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('assets/css'));
});

/**
*
* BrowserSync.io
* - Watch CSS, JS & HTML for changes
* - View project at: localhost:3000
*
**/
gulp.task('browser-sync',['jekyll-build'], function() {
  browserSync.init(['assets/css/**/*.scss', 'assets/js/**/*.js', 'index.html'], {
    server: {
      baseDir: '_site'
    }
  });
});

/**
*
* Javascript
* - Uglify
*
**/
gulp.task('scripts', function() {
  gulp.src('assets/js/*.js')
  .pipe(uglify())
  .pipe(rename({
    dirname: "min",
    suffix: ".min",
  }))
  .pipe(gulp.dest('assets/js'))
});

/**
*
* Images
* - Compress them!
*
**/
gulp.task('images', function () {
  return gulp.src('assets/img/*')
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant()]
  }))
  .pipe(gulp.dest('assets/img'));
});

gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['sass']);
    gulp.watch('assets/js/**'   ['scripts','jekyll-rebuild']);
    gulp.watch(['*.html', '_layouts/*.html','_includes/*.html', '_posts/*'], ['jekyll-rebuild']);
});

gulp.task('default', ['sass', 'browser-sync', 'scripts', 'images','watch']);
