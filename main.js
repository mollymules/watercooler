angular.module( 'watercooler', [
  'ui.router'
]);

watercooler.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'templates/main.html',
          controller: 'mainCtrl'
      })
      .otherwise({
          redirectTo: '/'
      });
});

watercooler.controller('mainCtrl', ['$scope','$q', 'tvService', function($scope, $q, tvService) {
tvService.getSchedule().then(function(result){
	$scope.schedule = result;

});

getSchedule();

}]); 

watercooler.service('tvService',  ['$q', function($q) {
this.getSchedule = function(){
	
}

}]);