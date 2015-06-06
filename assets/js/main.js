var watercooler = angular.module('watercooler', ['ngRoute']);

watercooler.config(function ($routeProvider) {
    $routeProvider
     
     .when('/', {
         templateUrl: 'templates/shows.html',
         controller: 'mainCtrl'
     })
         .when('/search', {
             templateUrl: 'templates/search.html',
             controller: 'mainCtrl'
         })
        .when('/add/:showID', {
            templateUrl: 'templates/add-people.html',
            controller: 'peopleCtrl'
        })
        .when('/episodes/:showID', {
            templateUrl: 'templates/episode-list.html',
            controller: 'episodesCtrl'
        })
        .when('/episode/:showID/:season/:episode', {
            templateUrl: 'templates/episode.html',
            controller: 'episodeCtrl'
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

watercooler.controller('episodesCtrl', ['$scope', '$q', '$routeParams', 'tvService', function ($scope, $q, $routeParams, tvService) {

    $scope.showId = $routeParams.showID;
    
    tvService.getShow($scope.showId).then(function (result) {
        $scope.showDetail = result.Show;
    });


    tvService.getEpisodes($scope.showId).then(function (result) {
        $scope.episodes = result;
    });
    
}]);

watercooler.controller('episodeCtrl', ['$scope', '$q', '$routeParams', 'tvService', function ($scope, $q, $routeParams, tvService) {

    $scope.showId = $routeParams.showID;
    $scope.season = $routeParams.season;
    $scope.episode = $routeParams.episode;

    tvService.getShow($scope.showId, $scope.season,$scope.episode).then(function (result) {
        $scope.episode = result.result;
    });
}]);

watercooler.controller('peopleCtrl', ['$scope', '$routeParams', 'tvService', function ($scope, $routeParams, tvService) {
    $scope.showId = $routeParams.showID;

    tvService.getShow($scope.showId).then(function (result) {
        $scope.showDetail = result.Show;
    });

    tvService.getPeople().then(function (result) {
        $scope.people = result.eqtls;
    });

    var selectedPeople = []

    $scope.addPerson = function (person) {
        person.isAdded = true;
        selectedPeople.push(person.id);
    }

    $scope.removePerson = function (person) {
        person.isAdded = false;
        var index = selectedPeople.indexOf(person.id);
        if (index !== -1) {
            selectedPeople.splice(index, 1);
        }
    }

    $scope.addShow = function () {
        tvService.addShow($scope.showDetail, $scope.selectedPeople);
    }
}])

watercooler.service('tvService', ['$q', '$http', function ($q, $http) {
    this.getSchedule = function () {


    }

    this.getShow = function (showId) {
        var deferred = $q.defer();
        var apiUrl = '//' + window.location.host + '/show/' + showId;
        $http.get(apiUrl).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject('None found');
        });
        return deferred.promise;
    }

    this.addShow = function (showDetail, people) {
        var deferred = $q.defer();

        var apiUrl = '//' + window.location.host + '/show/' + showDetail.showid;
        $http.post(apiUrl, { show: JSON.stringify(showDetail), people: JSON.stringify(people) }).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject('None found');
        });

        return deferred.promise;
    }

    this.getPeople = function (showId) {
        var deferred = $q.defer();
        var apiUrl;
        if (typeof (showId) != 'undefined') {
            apiUrl = '//' + window.location.host + '/people/' + showId;
        }else{
            apiUrl = '//' + window.location.host + '/people';
        }
     
        $http.get(apiUrl).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject('None found');
        });
        return deferred.promise;
    }

    this.getShows = function () {
        var deferred = $q.defer();

        var apiUrl = '//' + window.location.host + '/getShows';
        $http.get(apiUrl).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject('None found');
        });

        return deferred.promise;
    }

    this.getEpisodes = function (showId) {
        var deferred = $q.defer();

        var apiUrl = '//' + window.location.host + '/getEpisodes/' + showId;
        $http.get(apiUrl).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject('None found');
        });

        return deferred.promise;
    }

    this.searchShows = function (searchString) {
        var deferred = $q.defer();

        var apiUrl = '//' + window.location.host + '/search/' + searchString;
        $http.get(apiUrl).success(function (data) {
            deferred.resolve(data);
        }).error(function () {
            deferred.reject('None found');
        });

        return deferred.promise;
    }

    var tvRes = [{
        id: '', name: 'Game of Thrones', image: 'http://images.tvrage.com/shows/3/2930.jpg',
        people: [{ name: 'Mary', image: 'http://images.tvrage.com/shows/3/2930.jpg' }, { name: 'Sheila', image: 'http://images.tvrage.com/shows/3/2930.jpg' }]
    }, { id: '', name: 'Orphan Black', image: 'http://images.tvrage.com/shows/3/2930.jpg', people: [{ name: 'Mary', image: 'http://images.tvrage.com/shows/3/2930.jpg' }, { name: 'Ali', image: 'http://images.tvrage.com/shows/3/2930.jpg' }] }]
}]);