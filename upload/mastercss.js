var request = require('request');
var fs = require('fs');
var colors = require('colors');
var chalkAnimation = require('chalk-animation');

var source;

fs.readFile('../master.css', 'utf-8', function read(err, data) {
  if (err) {
    throw err;
  }
  
  source = data;

  var options = {
    url: 'http://api.hubapi.com/content/api/v2/templates/4724625226?hapikey=46d02796-2406-40e6-8ac0-7d4027ab09ae',
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
    console.log('statusCode:' + response && response.statusCode);
    //console.log((body));
  });
  
});