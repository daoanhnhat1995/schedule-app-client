angular.module("parse-starter.controllers")
  .controller("GenerateCtrl", function($scope,$state,$ionicPopup,Filter,Schedule,Course,classData,semesterData,scheduleData){
    $scope.courses = classData.getAll();
    $scope.blocks = Schedule.getBlockTime();

    $scope.blocks = [{"name":"Commute Time","dates":["M","W","F"],"start_time":"19:00:00","end_time":"19:50:00"},
    {"name":"Study Time","dates":["W","Th"],"start_time":"18:00:00","end_time":"18:50:00"}];
    $scope.generate = function(){

      console.log("Selected classes: " , $scope.courses);
      console.log("Selected blocks: ", $scope.blocks);
      console.log(Filter.isOverLap($scope.blocks));
      console.log(Filter.isConflict($scope.blocks, $scope.courses));
    };

})
