/* PLUGINS */
var gulp = require('gulp');

var environments = require('gulp-environments');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
var mq4HOverShim = require('mq4-hover-shim')
var autoprefixer = require('autoprefixer')

var development = environments.development;
var production = environments.production;

var scssPath = process.env.SCSS_PATH || 'node_modules/';

var sassOptions = {
  errLogToConsole: 'true',
  outputstyle: 'expanded',
  includePaths: scssPath
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

gulp.task( 'ftp', function () {
 
    var conn = ftp.create( {
        host:     'ftp.robfoggo.com',
        user:     'robfoggo',
        password: 'Kipler@1228',
        parallel: 10,
        log:      gutil.log,
    } );
 
    var globs = [
        'index.html',
        'services.html',
        'src/**',
        'css/**',
        'js/**',
        'fonts/**',
        // 'font-awesome/**',
        'img/**',
        'contact.php'
    ];
 
    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance
 
    return gulp.src( globs, { base: '.', buffer: false } )
        .pipe( conn.newer( '/public_html/littleorganizer' ) ) // only upload newer files
        .pipe( conn.dest( '/public_html/littleorganizer' ) );
 
} );

// Remove the temporary _site directory
gulp.task('clean',function(){
  rimraf('site')
})
