angular.module('parse-starter.controllers')
  .controller('myScheduleCtrl', function ($scope,$state,$ionicPopup,$ionicModal,Schedule,_,Cart){


    /**
     *
     * Bassically find course title of each schedule generated
     *
     */
    $scope.$on("$ionicView.beforeEnter", function () {
    var temp = Schedule.getSchedule();
    console.log(temp);
    var classList = Cart.getAll();

    if(temp.length > 0){
      angular.forEach(temp,function(c){
        if(c.course_id != undefined){
          c.course_title = _.where(classList,{id:c.course_id})[0].course_title;
        }
      });

      Schedule.setSchedule2(temp);
      $scope.schedules = Schedule.getSchedule();
      console.log("Schedules are:....");
      console.log($scope.schedules);


       $ionicModal.fromTemplateUrl('templates/schedule/timetable.html', {
          scope: $scope
        }).then(function(modal) {
          $scope.modal = modal;
        });

    } else {
      $ionicPopup.alert({
        title: "Oops",
        template: "You have no schedule yet",
        okType:'button button-clear button-outline'

      });
      $state.go('main.dashboard');
    }

    });



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


  .controller('dashBoardCtrl',function($scope,$ionicPopup,$state,Schedule){
    console.log(Schedule.getSchedule());

    $scope.$on("$ionicView.beforeEnter", function () {

      if($localstorage.get('semesters') === undefined ){
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
        $ionicPopup.alert({
          title: "Connection succeeds",
          content: "Cached",
          okType: "button button-clear"
        });
      }

    }
    });

  })
