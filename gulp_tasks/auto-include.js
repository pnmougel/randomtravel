
var gulp = require('gulp');
var inject = require('gulp-inject');
var bowerFiles = require('./my-bower-files').bowerFiles;

gulp.task('ai', function () {
    var appSources = gulp.src(['./dev/app/**/*.js', '!./dev/app/config/*.js'], {read: false});
    var vendorSources = gulp.src(bowerFiles.ext('js').files, {read: false});
    var cssSources = gulp.src(['./dev/css/*.css', '!./dev/css/*.min.css'], {read: false});
    var configSources = gulp.src(['./dev/app/config/*.js'], {read: false});

    gulp.src('./dev/index.html')
        .pipe(inject(vendorSources, {relative: true, ignorePath: '../www/', name: 'vendor'}))
        .pipe(inject(appSources, {relative: true, ignorePath: '../www/', name: 'app'}))
        .pipe(inject(configSources, {relative: true, ignorePath: '../www/', name: 'config'}))
        .pipe(inject(cssSources, {relative: true, name: 'style'}))
        .pipe(gulp.dest('./dev'));
});
