var request = require('request');
var fs = require('fs');

var options = {
    url: 'https://api.hubapi.com/hubdb/api/v2/tables/1035654',
    qs: {
        "portalId": '396606'
        },
    headers: {
    'User-Agent': 'request',
    },
    json: true
};

request.get(options, function (error, response, body) {
    console.log(body);
    
    for (i = 0; i < body.columns.length; i++) {
        console.log(body.columns[i].label);
    }

    // fs.writeFile('hubdb.json', JSON.stringify(body.columns, null, 5), function(err){
    // });
});