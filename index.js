'use strict';

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const through = require('through2');
const PluginError = require('plugin-error');
const File = require('vinyl');
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


    console.log('old mtime:', Math.floor(file.stat && file.stat.mtimeMs || Date.now()));
    currentGit.log(['-1', file.path], (err, result) => {
      if (err) {
        console.log(err);
      }
      let logLine = result && result.latest;
      if (logLine) {
        //console.log('item.mtime', item.mtime);
        item.mtime = new Date(logLine.date).getTime();
        //console.log('logLine.date', item.mtime);
        fs.utimesSync(item.path, item.mtime / 1000, item.mtime / 1000);
        //originItem.message = logLine.message;
      }

      if (arr.length === 0) {
        callback && callback(newArticleJsonList);
      } else {
        next();
      }
    });
    callback();
  });
};
