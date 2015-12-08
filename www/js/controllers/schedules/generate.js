angular.module("parse-starter.controllers")
  .controller("GenerateCtrl", function(_,scheduleAPI,$localstorage,
    $scope,$ionicModal,$state,Filter,Schedule,Cart,$ionicPopup){
   
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
      if(Cart.getAll().length == 0){
        $ionicPopup.alert({
          title: "Oops",
          template: "You have not selected any class",
          okType: 'button-clear'
        });
      } else {
              var list = Filter.isConflict($scope.blocks, $localstorage.get("schedules"));
               console.log("List ");
              console.log(list);
              Schedule.setSchedules(list);
              list = Schedule.getSchedules();

              if(list.possibles.length == 0){
                console.log(_.sample(list.conflicts,1))
                Schedule.setConflict(_.sample(list.conflicts,1)[0].d);
                console.log(Schedule.getConflict());
              	$scope.modal.show();

              } else { 
                Schedule.setSchedule(_.sample(list.possibles,1)[0]);
              	$state.go('main.my-schedule');
              }

            }
          };

})
