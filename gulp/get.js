require('dotenv').config();

var request = require('request');
var prompts = require('prompts');
var colors = require('colors');
var fs = require('fs');
var { files } = require('./files');

(async function() {

    var file = await prompts(
        {
          type: 'autocomplete',
          name: 'value',
          message: 'Pick a file',
          choices: files,
          initial: 0
        }
      );

    var options = {
        url: 'http://api.hubapi.com/content/api/v2/templates/' + file.value.id + '/buffer',
        qs: {
        "hapikey": process.env.HAPI_KEY
        },
        headers: {
        'User-Agent': 'request',
        },
        json: true
    };
    
    await request.get(options, function (error, response, body) {
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

        var sourceCode = response.body.source;

        fs.writeFile('../dist/' + file.value.source, sourceCode, function(err){
            if (err) {
                throw err;
            } else {
                console.log(file.value.source);
            }
        });

    });
})();

exports.files = files;