/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var dynamodb = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();

function configAWSDynDb() {
    AWS.config.update({
        region: "us-west-2",
        // The endpoint should point to the local or remote computer where DynamoDB (downloadable) is running.
        endpoint: 'http://localhost:8000',
        /*
          accessKeyId and secretAccessKey defaults can be used while using the downloadable version of DynamoDB. 
          For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
        */
        accessKeyId: "fakeMyKeyId",
        secretAccessKey: "fakeSecretAccessKey"
    });
}

function scanData() {
    //document.getElementById('textarea').innerHTML = "";
    //document.getElementById('textarea').innerHTML += "Scanning for movies between 1950 and 1975." + "\n";

    var params = {
        TableName: "EOMoonData"
        
	};

        /*
            ProjectionExpression: "#yr, title, info.rating",
        FilterExpression: "#yr between :start_yr and :end_yr",
        ExpressionAttributeNames: {
            "#yr": "year"
        },
        ExpressionAttributeValues: {
            ":start_yr": 1950,
            ":end_yr": 1975
        */
    

    docClient.scan(params, onScan);

    function onScan(err, mooninfo) {
        if (err) {
            //document.getElementById('textarea').innerHTML += "Unable to scan the table: " + "\n" + JSON.stringify(err, undefined, 2);
            console.log("Unable to scan the table: " + "\n" + JSON.stringify(err, undefined, 2));
        } else {
            // Print all the data
            console.log("Scan succeeded: " + "\n");
            $("#eoMoonDataTable").html("<thead><tr><td>Region</td><td>System</td><td>Planet</td><td>Moon</td><td>POS</td><td>Moon Mineral</td></tr></thead>");
            mooninfo.Items.forEach(function(mooninfo) {
                //document.getElementById('textarea').innerHTML += movie.year + ": " + movie.title + " - rating: " + movie.info.rating + "\n";
                $("#eoMoonDataTable").html("<tr><td>" + moondata.region + "</td></tr>")
            });

            // Continue scanning if we have more movies (per scan 1MB limitation)
           // document.getElementById('textarea').innerHTML += "Scanning for more..." + "\n";
           // params.ExclusiveStartKey = data.LastEvaluatedKey;
           // docClient.scan(params, onScan);            
        }
    }
}

