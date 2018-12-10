'use strict';

require('dotenv').config();

const { src, dest, watch } = require('gulp');
var { files } = require('./files');
var sass = require('gulp-sass');
var request = require('request');
var fs = require('fs');
var colors = require('colors');
var prompts = require('prompts');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');

livereload({start: true});


async function init(done) {

    var file = await prompts(
      {
        type: 'autocomplete',
        name: 'value',
        message: 'Pick a file',
        choices: files,
        initial: 0
      }
    );

    await fs.readFile('../dist/' + file.value.source, 'utf-8', function read(err, data) {
      if (err) {
        throw err;
      }
      var source = data;
      var options = {
        url: 'http://api.hubapi.com/content/api/v2/templates/' + file.value.id/* + '/buffer'*/,
        qs: {
          "hapikey": process.env.HAPI_KEY
        },
        headers: {
          'User-Agent': 'request',
        },
        json: true,
        body: {
          "source": source,
        }
      };

      request.put(options, function (error, response, body) {
        if (error) {
          console.log('error:', error);
        }
        console.log((response && response.statusCode).toString().green);
        var date = new Date(body.updated);
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        console.log(colors.italic('Updated:' + formattedTime.toString()));
        if (response.statusCode == 200) {
          livereload.reload();
        }
      });
    });
    done();
  };

function compile(done) {
    return src('../sass/*.scss')
    .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(dest('../dist/'));
    done();
}

watch(['../sass/**/*.scss'], compile, function (done){
    done();
});

watch(['../dist/*.css', '../dist/*.html', '../dist/*.js', '../dist/*/*.html'], init, function (done){
  done();
});


exports.default = compile;
exports.compile = compile;
exports.init = init;