
// Need to add aws-sdk and formidable
// npm install aws-sdk --save
// npm i -S formidable

var http = require('http');
var fs = require('fs');
var formidable = require("formidable");
var util = require('util');

var AWS = require("aws-sdk")
AWS.config.update ({
	region:"us-west-2",
	endpoint:"http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var table="ImageInfo";

//var db = new Datastore({filename: 'data/MoonMinerals.json', autoload: true});

var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processFormFieldsIndividual(req, res);
    }

});

function displayForm(res) {
    fs.readFile('forms/inputform_imginf.html', function (err, data) {
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
		
		
		var params = {
			TableName:table,
			Item:{
				"GroupName":fields['groupname'],
				"ImageName":fields['imagename'],
				"SubjectName":fields['subjectname'],
				"InsertDate":"2017-02-24",
				"ImageURL":fields['imageuri']
			}
		};
		console.log(params);
		docClient.put(params, function(err,data) {
			if (err) {
				console.error("Unable to add item Error JSON:", JSON.stringify(err, null, 2));
			} else {
				console.log("Added item:", JSON.stringify(data, null, 2));
			}
		});
		
		
    });
    form.parse(req);
}


server.listen(1185);
console.log("server listening on 1185");