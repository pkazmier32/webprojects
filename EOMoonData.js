/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var url = 'http://localhost:8887/data/EOMoonData.json';
var app=angular.module('myApp', [])
    .controller('getEOMoonDataCtrl', function($scope, $http) {		
	$scope.eoMoonData=[];
			
	$http.jsonp(url+'?callback=JSON_CALLBACK')
            .success(function(data) {
                    $scope.eoMoonData = data;
                    console.log(data);
		})
		.error(function(data) {
                    console.log(data);
		})
	});


