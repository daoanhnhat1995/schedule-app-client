angular.module("parse-starter.controllers")
  .controller("GenerateCtrl", function($scope,$state,$ionicPopup,Filter,Schedule,Course,classData,semesterData,scheduleData){
    $scope.courses = classData.getAll();
    $scope.blocks = Schedule.getBlockTime();

    $scope.blocks = [{"name":"Commute Time","dates":["Mo","We","Fr"],"start_time":"19:00:00","end_time":"19:50:00"},
    {"name":"Study Time","dates":["We","Th"],"start_time":"18:00:00","end_time":"18:50:00"}];
    $scope.generate = function(){

      console.log("Selected classes: " , $scope.courses);
      console.log("Selected blocks: ", $scope.blocks);
      console.log(Filter.isOverLap($scope.blocks));
      var list = Filter.isConflict($scope.blocks, $scope.courses);
      Schedule.setSchedules(list);
      Schedule.setSchedule(Schedule.getResult());
      var list = Schedule.getSchedule();



      if(list.conflicts.length >0){
      	console.log(list.conflicts);
      } else {
      	$state.go('main.my-schedule');
      }

    };

})
