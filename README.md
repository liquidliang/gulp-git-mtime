# gulp-git-mtime
===========


> Sync the mtime by git for gulp

## Usage

First, install `gulp-git-mtime` as a development dependency:

```shell
npm install --save-dev gulp-git-mtime
```

Then, add it to your `gulpfile.js`:

### Simple
```javascript
var mtimer = require('gulp-git-mtime');

gulp.task('mtimer', function(){
  return gulp.src('./public/**/*.md')
    .pipe(mtimer())
    .pipe(gulp.dest('./'));
});
```
