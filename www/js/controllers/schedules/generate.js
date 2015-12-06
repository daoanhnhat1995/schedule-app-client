angular.module("parse-starter.controllers")
  .controller("GenerateCtrl", function(scheduleAPI,sessionService,departmentAPI,semesterAPI,$scope,$ionicModal,$state,$ionicPopup,Filter,Schedule,Course,classData,scheduleData){
   
    $scope.courses = sessionService.get("scheduleList");
    console.log($scope.courses);
    $scope.blocks = Schedule.getBlockTime();

        // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/schedule/conflict_messages.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });

    $scope.generate = function(){

      console.log("Selected classes: " , $scope.courses);
      console.log("Selected blocks: ", $scope.blocks);
      console.log(Filter.isOverLap($scope.blocks));
      var list = Filter.isConflict($scope.blocks, $scope.courses);
      Schedule.setSchedules(list);
      Schedule.setSchedule(Schedule.getResult());
      var list = Schedule.getSchedule();




      if(list.conflicts.length >0){
      	console.log(list.conflicts[0]);
      	$scope.modal.show();

      } else { 
      	
      	$state.go('main.my-schedule');
      }

    };

})
