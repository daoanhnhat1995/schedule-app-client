angular.module('parse-starter.controllers')
  .controller('myScheduleCtrl', function ($scope,Schedule){
    $scope.data = Schedule.getResult()[0];
    console.log($scope.data);
  })
