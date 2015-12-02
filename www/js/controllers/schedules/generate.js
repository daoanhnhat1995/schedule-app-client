angular.module("parse-starter.controllers")
  .controller("GenerateCtrl", function($scope,$state,$ionicPopup,Filter,Schedule,Course,Department,semesterData,scheduleData){
    $scope.classes = Schedule.getListClass();
    $scope.blocks = Schedule.getBlockTime();
    $scope.generate = function(){
      console.log("Selected classes: " , $scope.classes);
      console.log("Selected blocks: ", $scope.blocks);
    };

})
