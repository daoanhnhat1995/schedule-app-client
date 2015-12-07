angular.module('parse-starter.controllers')
  .controller('myScheduleCtrl', function ($scope,Schedule,_){

    var temp = _.sample(Schedule.getSchedules().possibles,1)[0];
    if(temp != undefined){
      $scope.schedules = temp.d;
    }

  })


  .controller('conflictMessageCtrl',function(_,$scope,Schedule){
    
    var temp = $scope.conflicts= _.sample(Schedule.getSchedules().conflicts,1);
    if(temp != undefined){
      $scope.conflicts = temp.d;
    }

    $scope.show = function(){
    $scope.conflicts= _.sample(Schedule.getSchedules().conflicts,1)[0].d;

     };
      
  })


  .controller('settingCtrl',function($scope,$localstorage,semesterAPI,classAPI){
    /**
     *
     * Cache basic semester and course catalogs to local storage
     *
     */
    
    $scope.load = function(){
      console.log("Caching....");
      semesterAPI.getAll(cache).then(function(d){
        $localstorage.set('semesters',d.data);
        cache(d.data);

      });

      classAPI.getAll().then(function(d){
        $localstorage.set('courses',d.data);
      });
      function cache(){
         console.log("Semesters cached :" + $localstorage.get("semesters").length);
        console.log("Courses cached :" + $localstorage.get("courses").length);
        console.log("Done caching...");
      }
     
    }

    $scope.clean =function(){
      console.log("Clear caching...");
      $localstorage.clear();
     
      console.log("Clear done");
    }
  })
