angular.module("parse-starter.controllers")
  .controller("GenerateCtrl", function(_,scheduleAPI,$localstorage,
    $scope,$ionicModal,$state,Filter,Schedule){
   
    $scope.courses = $localstorage.get("schedules");
    console.log($scope.courses);
    $scope.blocks = Schedule.getBlockTime();

    /**
     *
     * Loading modals from detail view and conflicts ....
     *
     */
  

    $ionicModal.fromTemplateUrl('templates/courses/index.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal2 = modal;
    });

    $ionicModal.fromTemplateUrl('templates/schedule/conflict_messages.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });




    $scope.generate = function(){

      console.log("Selected classes: " , $localstorage.get("schedules"));
      console.log("Selected blocks: ", $scope.blocks);


      console.log(Filter.isOverLap($scope.blocks));

      var list = Filter.isConflict($scope.blocks, $localstorage.get("schedules"));
       console.log("List ");
      console.log(list);
      Schedule.setSchedules(list);
      list = Schedule.getSchedules();

      if(list.possibles.length == 0){
      	$scope.modal.show();

      } else { 
      	
      	$state.go('main.my-schedule');
      }

    };

})
