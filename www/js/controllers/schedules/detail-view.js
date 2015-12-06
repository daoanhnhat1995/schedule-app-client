angular.module('parse-starter.controllers')
  .controller('myScheduleCtrl', function ($scope,Schedule,_){
    var list = Schedule.getSchedule();
    $scope.data = [];

    if(list.conflicts.length == 0){
    	$scope.data = _.flatten(list.schedules);
    } else {
    	$scope.data = _.flatten(list.conflicts[0]);
    }
  })


  .controller('conflictMessageCtrl',function($scope,Schedule){
  	$scope.data= Schedule.getSchedule().conflicts;
  	$scope.click = function(){
  		$scope.data = Schedule.getSchedule().conflicts;
  	}

  })
