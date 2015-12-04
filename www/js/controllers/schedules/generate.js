angular.module("parse-starter.controllers")
  .controller("GenerateCtrl", function($scope,$state,$ionicPopup,Filter,Schedule,Course,Department,semesterData,scheduleData){
    $scope.courses = Schedule.getCourses();
    $scope.blocks = Schedule.getBlockTime();
    $scope.generate = function(){
      console.log("Selected classes: " , $scope.courses);
      console.log("Selected blocks: ", $scope.blocks);
    };

})
