var request = require('request');


    var options = {
        url: 'https://api.hubapi.com/hubdb/api/v1/tables/677344/rows?portalId=396606',
        qs: {
        "hapikey": "46d02796-2406-40e6-8ac0-7d4027ab09ae"
        },
        headers: {
        'User-Agent': 'request',
        },
        json: true
    };
    
    request.get(options, function (error, response, body) {
        if (error) {
            console.log('error:', error);
        }
        for (i = 0; i < body.objects.length; i++) {
            console.log(body.objects[i].id + body.objects[i].values);
        }
        

    });