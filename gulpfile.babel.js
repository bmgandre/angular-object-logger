import gulp from 'gulp';

const deployFolder = './dist/angular-object-logger';

gulp.task('deploy:readme', () => {
  return gulp.src('README.MD')
    .pipe(gulp.dest(deployFolder));
});

gulp.task('deploy:license', () => {
  return gulp.src('LICENSE')
    .pipe(gulp.dest(deployFolder));
});

gulp.task('deploy:docs', [ 'deploy:readme', 'deploy:license' ]);
