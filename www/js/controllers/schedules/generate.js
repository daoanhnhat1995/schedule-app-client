angular.module("parse-starter.controllers")
  .controller("GenerateCtrl", function($scope,$ionicModal,$state,$ionicPopup,Filter,Schedule,Course,classData,scheduleData){
    $scope.courses = classData.getAll();
    $scope.blocks = Schedule.getBlockTime();

    $scope.blocks = [{"name":"Commute Time","dates":["Mo","We","Fr"],"start_time":"19:00:00","end_time":"19:50:00"},
    {"name":"Study Time","dates":["We","Th"],"start_time":"18:00:00","end_time":"19:50:00"}];
    

        // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/schedule/conflict_messages.html', function($ionicModal) {
        $scope.modal = $ionicModal;
    }, {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
    });


        // Load the modal from the given template URL
    $ionicModal.fromTemplateUrl('templates/schedule/detail-view.html', function($ionicModal) {
        $scope.modal2 = $ionicModal;

	    }, {
	        // Use our scope for the scope of the modal to keep it simple
        scope: $scope,
        controller: 'myScheduleCtrl',
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
      	console.log(list.conflicts);
      	$scope.modal.show();

      } else { 
      	$scope.modal2.show();
      }

    };

})
