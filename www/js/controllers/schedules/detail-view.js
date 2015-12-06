angular.module('parse-starter.controllers')
  .controller('myScheduleCtrl', function ($scope,classAPI,sessionService,semesterAPI,Schedule,_){


    // allData.loadAll();
    semesterAPI.getAll().then(function(d){
                    sessionService.set("semesterData",d.data);
    });
    classAPI.getAll().then(function(d){
      sessionService.set("classData",d.data);
    });
    console.log(sessionService.get("classData"));
    var list = Schedule.getSchedule();
    $scope.data = [];

    if(list.conflicts.length == 0){
    	$scope.data = _.flatten(list.schedules);
    } else {
    	$scope.data = _.flatten(list.conflicts[0]);
    }
  })


  .controller('conflictMessageCtrl',function(_,$scope,Schedule){
  	$scope.data= Schedule.getSchedule().conflicts;
  	$scope.click = function(){
  		$scope.data = _.flatten(Schedule.getSchedule().conflicts[0]);
  	}


  })
