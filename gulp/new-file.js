require('dotenv').config();

var request = require('request');
var prompts = require('prompts');
var fs = require('fs');
var { files } = require('./files');

(async function() {

    let questions = [
        {
            type: 'autocomplete',
            name: 'category_id',
            message: 'This parameter category type:',
            choices: [
                { title: '0 - Unmapped', value: 0 },
                { title: '1 - Landing Pages', value: 0 },
                { title: '2 - Email', value: 0 },
                { title: '3 - Blog Post', value: 0 },
                { title: '4 - Site Page', value: 0 },
            ]
        },
        {
            type: 'autocomplete',
            name: 'template_type',
            message: 'This parameter accepts a numeric value and sets the type of template that is created. The following numbers correspond to specific template types:',
            choices: [
                { title: '2 - Email template', value: 0 },
                { title: '4 - Page template', value: 1 },
                { title: '6 - Blog template', value: 2 },
                { title: '11 - Error template', value: 3 },
                { title: '12 - Subscription preferences template', value: 4 },
                { title: '13 - Backup unsubscribe page template', value: 5 },
                { title: '14 - Subscriptions update confirmation template', value: 6 },
                { title: '19 - Password prompt page template', value: 7 },
            ]
        },
        {
            type: 'text',
            name: 'path',
            message: 'The Design Manager path to the directory that contains the file being created',
        },
        {
            type: 'text',
            name: 'local_file',
            message: 'Local file to be overwritten or created.',
        }
    ];
    
    let answers = await prompts(questions);

    await fs.readFile('../dist/_template.html', 'utf8', function (err, source){
        
        fs.writeFile('../dist/' + answers.local_file, source, function(err){
            if (err) {
                throw err;
            } else {
                console.log('../dist/' + answers.local_file);
            }
        });

        var options = {
            url: 'https://api.hubapi.com/content/api/v2/templates',
            qs: {
              "hapikey": process.env.HAPI_KEY
            },
            headers: {
              'User-Agent': 'request',
            },
            json: true,
            body: {
                "category_id": answers.category_id.value,
                "is_available_for_new_content": "False",
                "template_type": answers.template_type.value,        
                "path": answers.path,
                "source": source,
            }
          };

        request.post(options, function (error, response, body) {
            var newFile = {
                title: answers.local_file,
                value: {
                  id: body.id,
                  source: answers.local_file
                }
            };
            console.log(JSON.stringify(newFile, null, 2));
          });

    });

})();


