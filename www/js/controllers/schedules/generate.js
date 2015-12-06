angular.module("parse-starter.controllers")
<<<<<<< HEAD
  .controller("GenerateCtrl", function($scope,$ionicModal,$state,$ionicPopup,Filter,Schedule,Course,classData,scheduleData){
=======
  .controller("GenerateCtrl", function($scope,$state,$ionicPopup,Filter,Schedule,Course,classData,semesterData,scheduleData){
>>>>>>> 086bc156526041c97987d5fa9595a3f2570a77c2
    $scope.courses = classData.getAll();
    $scope.blocks = Schedule.getBlockTime();

    $scope.blocks = [{"name":"Commute Time","dates":["Mo","We","Fr"],"start_time":"19:00:00","end_time":"19:50:00"},
<<<<<<< HEAD
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


=======
    {"name":"Study Time","dates":["We","Th"],"start_time":"18:00:00","end_time":"18:50:00"}];
    $scope.generate = function(){

>>>>>>> 086bc156526041c97987d5fa9595a3f2570a77c2
      console.log("Selected classes: " , $scope.courses);
      console.log("Selected blocks: ", $scope.blocks);
      console.log(Filter.isOverLap($scope.blocks));
      var list = Filter.isConflict($scope.blocks, $scope.courses);
      Schedule.setSchedules(list);
      Schedule.setSchedule(Schedule.getResult());
      var list = Schedule.getSchedule();



      if(list.conflicts.length >0){
      	console.log(list.conflicts);
<<<<<<< HEAD
      	$scope.modal.show();

      } else { 
      	$scope.modal2.show();
=======
      } else {
      	$state.go('main.my-schedule');
>>>>>>> 086bc156526041c97987d5fa9595a3f2570a77c2
      }

    };

})
