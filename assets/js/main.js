angular.module('watercooler', [
  'ui.router'
]);

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
    tvService.getSchedule().then(function (result) {
        $scope.schedule = result;

    });


    $scope.searchShows = function () {
        tvService.searchShows($scope.textBoxInput).then(function (result) {
            $scope.searchResults = result;
        });
    }

}]);

watercooler.service('tvService', ['$q', '$http', function ($q, $http) {
    this.getSchedule = function () {
    

    }

    this.searchShows = function (searchString) {
        var deferred = $q.defer();
        setTimeout(function () {
            var apiUrl = '//' + window.location.host + '/search/' + searchString;
            $http.get(apiUrl).success(function (data) {
                deferred.resolve(tvShows);
            }).error(function () {
                deferred.reject('None found');
            });
        }, 1000);
        return deferred.promise;
    }

    var tvShows = {
        "Results": {
            "show": [
              {
                  "showid": "2930",
                  "name": "Buffy the Vampire Slayer",
                  "link": "http://www.tvrage.com/Buffy_The_Vampire_Slayer",
                  "country": "US",
                  "started": "1997",
                  "ended": "2003",
                  "seasons": "7",
                  "status": "Ended",
                  "classification": "Scripted",
                  "genres": {
                      "genre": [
                        "Action",
                        "Adventure",
                        "Comedy",
                        "Drama",
                        "Horror/Supernatural",
                        "Mystery",
                        "Sci-Fi"
                      ]
                  }
              },
              {
                  "showid": "31192",
                  "name": "Buffy the Vampire Slayer - Season Eight: Motion comics",
                  "link": "http://www.tvrage.com/buffy-the-vampire-slayer-season-eight-mo",
                  "country": "US",
                  "started": "2010",
                  "ended": "2010",
                  "seasons": "1",
                  "status": "Canceled/Ended",
                  "classification": "Animation",
                  "genres": {
                      "genre": [
                        "Animation General",
                        "Action",
                        "Adventure",
                        "Comedy",
                        "Drama",
                        "Horror/Supernatural",
                        "Sci-Fi"
                      ]
                  }
              },
    {
        "showid": "2931",
        "name": "Buffy the Animated Series",
        "link": "http://www.tvrage.com/Buffy_the_Animated_Series",
        "country": "US",
        "started": "2002",
        "ended": "0",
        "seasons": "1",
        "status": "Pilot Rejected",
        "classification": "Animation",
        "genres": {
            "genre": [
              "Animation General",
              "Action",
              "Adventure",
              "Horror/Supernatural"
            ]
        }
    }
            ]
        }
    }

}]);