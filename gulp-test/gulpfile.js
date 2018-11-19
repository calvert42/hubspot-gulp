const { src, dest, watch } = require('gulp');
var sass = require('gulp-sass');
var prompt = require('gulp-prompt');
var request = require('request');
var convert = require('gulp-convert-encoding');
var log = require('fancy-log');
var map = require('map-stream');

function compile(done) {
    return src('*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(dest('./css'));
    done();
};

function push(done) {
    return source = src('*.css')
    .pipe(map(function(file, done) {
        var str = file.contents.toString();

        log('????');
    
        done();
      }))
    console.log(source);
}

watch(['*.scss', './css/*.css'], push);

exports.default = compile;
exports.compile = compile;
exports.push = push;