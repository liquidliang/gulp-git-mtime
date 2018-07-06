'use strict';

const fs = require('fs');
const through = require('through2');
const PluginError = require('plugin-error');
const git = require('simple-git');

module.exports = function () {

  let currentGit = git(process.cwd());
  currentGit.log(['-1', process.cwd()], (err, result) => {
    // {"all":[],"latest":null,"total":0}
    if (err) {
      console.log(err);
      currentGit = null;
    }
  });

  return through.obj((file, enc, callback) => {
    if (!currentGit){
      return callback(null, file);
    }
    // Do nothing if no contents
    if (file.isNull()) {
      this.emit("error", new PluginError('gulp-git-mtime', "File is null"));
      this.emit("end");
      return callback(null, file);
    }


    currentGit.log(['-1', file.path], (err, result) => {
      if (err) {
        console.log(err);
        return callback(null, file);
      }
      let logLine = result && result.latest;
      if (logLine) {
        let mtime = new Date(logLine.date).getTime();
        if (mtime != (file.stat && file.stat.mtimeMs)){
          fs.utimesSync(file.path, mtime / 1000, mtime / 1000);
        }
      }

      callback(null, file);
    });
    
  });
};
