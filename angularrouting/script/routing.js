(function(angular) {
  'use strict';
angular.module('ngViewExample', ['ngRoute', 'ngAnimate'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/Book/:bookId', {
          templateUrl: 'book.html',
          controller: 'BookCtrl',
          controllerAs: 'book'
        })
        .when('/Book/widar/:bookId', {
          templateUrl: 'widar.html',
          controller: 'BookCtrl',
          controllerAs: 'book'
        })
        .when('/Book/widar/:bookId/ch/:chapterId', {
          templateUrl: 'widarchap',
          controller: 'ChapterCtrl',
          controllerAs: 'chapter'
        })
        .when('/Book/:bookId/ch/:chapterId', {
          templateUrl: 'chapter.html',
          controller: 'ChapterCtrl',
          controllerAs: 'chapter'
        });

      $locationProvider.html5Mode(true);
  }])
  .controller('MainCtrl', ['$route', '$routeParams', '$location',
    function($route, $routeParams, $location) {
      this.$route = $route;
      this.$location = $location;
      this.$routeParams = $routeParams;
  }])
  .controller('BookCtrl', ['$routeParams', function($routeParams) {
    this.name = "BookCtrl";
    this.params = $routeParams;
  }])
  .controller('ChapterCtrl', ['$routeParams', function($routeParams) {
    this.name = "ChapterCtrl";
    this.params = $routeParams;
  }])
  .controller('AtrappCtrl', ['$scope', function($scope) {
    $scope.$back = false;
  }]);
})(window.angular);