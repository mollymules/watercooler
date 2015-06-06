var watercooler = angular.module('watercooler', ['ngRoute']);

watercooler.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
          templateUrl: 'templates/search.html',
          controller: 'mainCtrl'
      })
     .when('/all', {
        templateUrl: 'templates/allShows.html',
        controller: 'mainCtrl'
     })
        .when('/add/:showID', {
            templateUrl: 'templates/add-people.html',
            controller: 'peopleCtrl'
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
        });
    }
}]);

watercooler.controller('peopleCtrl', ['$scope', '$routeParams', 'tvService', function ($scope, $routeParams, tvService) {
    $scope.showId = $routeParams.showID;

    tvService.getShow($scope.showId).then(function (result) {
        $scope.showDetail = result;
    });

    tvService.getPeople().then(function (result) {
        $scope.people = result;
    });

    var selectedPeople = []

    $scope.addPerson = function(person){
        person.isAdded = true;
        selectedPeople.push(person.id);
        console.log($scope);
    }

    $scope.removePerson = function(person){
        person.isAdded = false;
        var index = selectedPeople.indexOf(person.id);
        if (index !== -1) {
            selectedPeople.splice(index, 1);
        }
    }

    $scope.addShow = function(){
        tvService.addShow($scope.showDetail, $scope.selectedPeople);
    }
}])

watercooler.service('tvService', ['$q', '$http', function ($q, $http) {
    this.getSchedule = function () {
    

    }
    
    this.getShow = function (showId) {
        var deferred = $q.defer();
        setTimeout(function () {
            var apiUrl = '//' + window.location.host + '/show/' + showId;
            $http.get(apiUrl).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject('None found');
            });
        }, 1000);
        return deferred.promise;
    }

    this.addShow = function (showDetail, people) {
        var deferred = $q.defer();
        setTimeout(function () {
            var apiUrl = '//' + window.location.host + '/show/' + showDetail.showid;
            $http.post(apiUrl, {show:JSON.stringify(showDetail), people: JSON.stringify(people)}).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                deferred.reject('None found');
            });
        }, 1000);
        return deferred.promise;
    }

    this.getPeople= function (showId) {
        var deferred = $q.defer();
        setTimeout(function () {
           
            deferred.resolve([{ id:'1',name: 'Mary', image: 'http://images.tvrage.com/shows/3/2930.jpg' }, {id:'2', name: 'Sheila', image: 'http://images.tvrage.com/shows/3/2930.jpg' }]);
           
        }, 1000);
        return deferred.promise;
    }

    this.getShows = function () {
        var deferred = $q.defer();
        setTimeout(function () {
            var apiUrl = '//' + window.location.host + '/getShows';
            $http.get(apiUrl).success(function (data) {
                deferred.resolve(data);
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