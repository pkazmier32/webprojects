var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');
var Datastore = require('nedb');

var db = new Datastore({filename: 'data/MoonMinerals.json', autoload: true});

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processFormFieldsIndividual(req, res);
    }

});

function displayForm(res) {
    fs.readFile('forms/inputform.html', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processFormFieldsIndividual(req, res) {
    //Store the data from the fields in your data store.
    //The data store could be a file or database or any other store based
    //on your application.
    var fields = [];
    var form = new formidable.IncomingForm();
    form.on('field', function (field, value) {
        //console.log(field);
        //console.log(value);
        fields[field] = value;
		
    });

    //Call back at the end of the form.
    form.on('end', function () {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
				
        res.end(util.inspect({
            fields: fields
        }));
		
		
		var mm = {region: fields['region'],
					system: fields['starsystem'],
					planet: fields['planet']};
		//console.log(mm);
		
		db.insert(mm, function(err, doc) {
			console.log('Inserted item with ID ', doc._id);
		});
		
    });
    form.parse(req);
}
//console.log(fields[0].field + " " + fields[0].value);

server.listen(1185);
console.log("server listening on 1185");