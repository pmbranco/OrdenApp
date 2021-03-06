
var ntable = 0;

//Socket.io
    var socket = io('http://localhost:3000');
/*
    socket.on('ROOM_CNN',function(data){
        data = {table: ntable}
    	socket.emit('ROOM_CNN', data);
    });
*/

    socket.on('MSG',function(data){
    	console.log(data);
    })

//JQuery

    $(document).on("click", "#beerbutton", function() {
        console.log("BeerButton click!");

        var data = {
            table:  ntable,
            name:   "table ntable"
        };

        if (socket.emit('BEERPLX',data)) alert("Se ha enviado la petición...");
    });
   
   // $( document, "input tablebtn" ).on( "click", function() {
    //$('input:radio[name="tables"]').change(function(){
    
    $(document).on("click", "label", function() {

        var valueRadio = this.children.tables.value
        ntable = valueRadio;
        var data = {table: valueRadio};

        socket.emit('ROOM_CNN',data);
    });


//Angular

    // create the module and name it beerApp
        // also include ngRoute for all our routing needs
    var beerApp = angular.module('beerApp', ['ngRoute']);

    // configure our routes
    beerApp.config(function($routeProvider) {
        $routeProvider

            // route for the table page
            .when('/', {
                templateUrl : '/pages/tables.html',
                controller  : 'tablesController'
            })

            // route for the beer button page
            .when('/beerbutton', {
                templateUrl : '/pages/beerbutton.html',
                controller  : 'berbuttonController'
            })

            // route for the menu page
            .when('/menu', {
                templateUrl : '/pages/menu.html',
                controller  : 'menuController'
            })

            // route for the info page
            .when('/info', {
                templateUrl : '/pages/info.html',
                controller  : 'infoController'
            });
    });

    // create the controller and inject Angular's $scope
    beerApp.controller('tablesController', function($scope) {
        
        $scope.ntables=50;

        //Create and fill array of tables
        $scope.tables = function(num) {
            var arr = new Array(num); 
            for( i=0; i < arr.length; i++){
                arr[i]=i;
            }

            return arr;
        }  

        $scope.tableSelected = 2;

        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
        //function to make array with tables

    });

    beerApp.controller('berbuttonController', function($scope) {
        $scope.message = 'beer.';
    });

    beerApp.controller('menuController', function($scope, $http) {
        $scope.message = 'Menu page.';


        $http.get('javascripts/menu.json')
            .then(function(res){
                $scope.menu = res.data; 
                console.log(res.data)               
        });


    });

    beerApp.controller('infoController', function($scope) {
        $scope.message = 'Contact us! JK. This is just a demo.';
    });