angular.module('parse-starter.controllers')
  .controller('myScheduleCtrl', function ($scope,scheduleData){
    $scope.data = scheduleData.getSchedules();
  })
