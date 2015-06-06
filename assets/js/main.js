var watercooler = angular.module('watercooler', ['ngRoute']);

watercooler.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'templates/shows.html',
          controller: 'mainCtrl'
      })
      .otherwise({
          redirectTo: '/'
      });
});

watercooler.controller('mainCtrl', ['$scope', '$q', 'tvService', function ($scope, $q, tvService) {

    $scope.getAllShows = function () {
        tvService.getShows().then(function (result) {
            $scope.allShows = result;

        });
    }


    $scope.searchShows = function () {
        tvService.searchShows($scope.textBoxInput).then(function (result) {
            $scope.searchResults = result.Results.show;
            console.log($scope.searchResults);
        });
    }
}]);

watercooler.service('tvService', ['$q', '$http', function ($q, $http) {
    this.getSchedule = function () {
    

    }
    
    this.getShows = function () {
        var deferred = $q.defer();
        setTimeout(function () {
            var apiUrl = '//' + window.location.host + '/getShows';
            $http.get(apiUrl).success(function (data) {
                deferred.resolve(tvRes);
            }).error(function () {
                deferred.reject('None found');
            });
        }, 1000);
        return deferred.promise;
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

    var tvRes = [{ id: '', name: 'Game of Thrones', image: '', people: [{ name: 'Mary', image: '' }, { name: 'Sheila', image: '' }] }, { id: '', name: 'Orphan Black', image: '', people: [{ name: 'Mary', image: '' }, { name: 'Ali', image: '' }] }]
}]);