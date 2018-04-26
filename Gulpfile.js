/* PLUGINS */
var environments = require('environments');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

var development = environments.development;
var production = environments.production;

var scssPath = process.env.SCSS_PATH || 'node_modules/';
var sassOptions = {
  errLogToConsole: 'true',
  outputstyle: 'expanded',
  includePaths: scssPath;

};
var processors = [
  mq4HOverShim.postprocessorFor({ hoverSelectorPrefix: '.bs-true-hover'}),
  autoprefixer({
    browsers: [

    ]
  })
]


/* TASKS */

gulp.task('compile-sass', function(){
  return gulp.src('./scss/app.scss')
    .pipe(development(sourcemaps.init() ))
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(development(sourcemaps.write() ))
    .pipe(gulp.dest('./_site/css'))
})

// Remove the temporary _site directory
gulp.task('clean',function(){
  rimraf('site')
})
