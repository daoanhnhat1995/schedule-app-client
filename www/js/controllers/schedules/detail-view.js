angular.module('parse-starter.controllers')
  .controller('myScheduleCtrl', function ($scope,Schedule,_){
    var list = Schedule.getSchedule();
    $scope.data = [];

    if(list.conflicts.length == 0){
    	$scope.data = _.flatten(list.schedules);
    } else {
    	$scope.data = _.flatten(list.conflicts[0]);
    }
<<<<<<< HEAD
  })


  .controller('conflictMessageCtrl',function($scope,Schedule){
  	$scope.data= Schedule.getSchedule().conflicts;
  	$scope.click = function(){
  		$scope.data = Schedule.getSchedule().conflicts;
  	}

=======
>>>>>>> 086bc156526041c97987d5fa9595a3f2570a77c2
  })
