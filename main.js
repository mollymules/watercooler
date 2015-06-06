angular.module( 'watercooler', [
  'ui.router'
]);

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