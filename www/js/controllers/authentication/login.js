/**
 */
angular.module('parse-starter.controllers')
  .controller('LoginCtrl', function ($scope, Core, $ionicHistory,$rootScope) {


    $scope.user = {};
    $ionicHistory.nextViewOptions({
      disableBack: true
    });

    $scope.$watchGroup(['user.username', 'user.password'], function (newVal) {
      var user = newVal[0] != undefined && newVal[0].length > 4,
        password = newVal[1] != undefined && newVal[1].length > 4;

      $scope.ready = !!(user && password);
    });


    $scope.login = function (user) {
      Core.userLogin(user.username, user.password);
    };



  });
