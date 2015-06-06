var watercooler = angular.module('watercooler', ['ngRoute']);

watercooler.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'templates/search.html',
          controller: 'mainCtrl'
      })
      .otherwise({
          redirectTo: '/'
      });
});

watercooler.controller('mainCtrl', ['$scope', '$q', 'tvService', function ($scope, $q, tvService) {

    var getAllShows = function () {
        tvService.getSchedule().then(function (result) {
            $scope.schedule = result;

        });
    }


    $scope.searchShows = function () {
        tvService.searchShows($scope.textBoxInput).then(function (result) {
            $scope.searchResults = result;
        });
    }
    $scope.textBoxInput = 'buff';
    $scope.searchShows();
}]);

watercooler.service('tvService', ['$q', '$http', function ($q, $http) {
    this.getSchedule = function () {
    

    }

    this.searchShows = function (searchString) {
        var deferred = $q.defer();
        setTimeout(function () {
            var apiUrl = '//' + window.location.host + '/search/' + searchString;
            $http.get(apiUrl).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject('None found');
            });
        }, 1000);
        return deferred.promise;
    }

  
}]);