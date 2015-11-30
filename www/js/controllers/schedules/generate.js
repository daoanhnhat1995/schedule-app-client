angular.module("parse-starter.controllers")
  .controller("GenerateCtrl", function($scope,$state,$ionicPopup,Filter,Schedule,Course,Department,semesterData,scheduleData){
    $scope.classes = Schedule.getListClass();
    $scope.blocks = Schedule.getBlockTime();
    $scope.generate = function(){
      
    };

})
