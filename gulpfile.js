var gulp = require('gulp');

require('./gulp_tasks/auto-include');
require('./gulp_tasks/deploy');

gulp.task('default', ['watch']);


gulp.task('watch', function() {
  gulp.watch('dev/app/css/*.css', ['ai']);
  gulp.watch('dev/app/**/*.js', ['ai']);
  gulp.watch('bower.json', ['ai']);
});