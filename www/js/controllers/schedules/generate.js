angular.module("parse-starter.controllers")
  .controller("GenerateCtrl", function($scope,$state,$ionicPopup,Filter,Schedule,Course,classData,semesterData,scheduleData){
    $scope.courses = classData.getAll();
    $scope.blocks = Schedule.getBlockTime();
    $scope.generate = function(){
    
      console.log("Selected classes: " , $scope.courses);
      console.log("Selected blocks: ", $scope.blocks);
      console.log(Filter.match2($scope.courses));
    };

})
