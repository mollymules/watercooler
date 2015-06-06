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
            $scope.searchResults = result;
        });
    }
    $scope.textBoxInput = 'buff';
    $scope.searchShows();
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

    var tvRes = [{ id: '', name: 'Game of Thrones', image: 'http://images.tvrage.com/shows/3/2930.jpg', people: [{ name: 'Mary', image: 'http://images.tvrage.com/shows/3/2930.jpg' }, { name: 'Sheila', image: 'http://images.tvrage.com/shows/3/2930.jpg' }] }, { id: '', name: 'Orphan Black', image: 'http://images.tvrage.com/shows/3/2930.jpg', people: [{ name: 'Mary', image: 'http://images.tvrage.com/shows/3/2930.jpg' }, { name: 'Ali', image: 'http://images.tvrage.com/shows/3/2930.jpg' }] }]
}]);