angular.module("parse-starter.controllers")
  .controller("GenerateCtrl", function($scope,$state,$ionicPopup,Filter,Schedule,Course,Department,scheduleData){

    $scope.listClass = Schedule.getListClass();

    /* remove class from list of classes */
    $scope.remove = function(each){
      Schedule.removeClass(each);
    };

    /* add class to list of classes */
    $scope.add = function(){
      console.log("classes picked are : ", $scope.listClass);
      $ionicPopup.confirm({
          title: 'Add class',
          templateUrl: "templates/schedule/add-class.html",
          scope: $scope,
          okType: 'button-balanced',
          controller: 'GenerateCtrl'
      }).then(function(res) {
          if(res) {
            Schedule.addClass($scope.data.dept,$scope.data.course);
            $scope.data.dept = '';
            $scope.data.course = '';
          } else {
          }
      });
    };


    $scope.data = {'resultDept': [], 'dept': '','course':'','resultCourse':[]}

    $scope.change = function(){
      $scope.data.resultDept = [];
      $scope.data.resultCourse = [];

    }

    /* filter search for department name
    * e.g... CSE,MATH,...
    */
    $scope.searchDepartment = function(){
      Filter.search($scope.data.dept,Department.getDepartments()).then(
        function(matches){
          if($scope.data.dept !== '')    { $scope.data.resultDept = matches;  }
        /*
        * If done with search, refresh search queue
        */
        else
          {
           $scope.data.resultDept = [];
           }

        })
    };


    /* filter search for department name
    * e.g... CSE1310,...
    */
    $scope.searchCourse = function(){
      Filter.search($scope.data.course,Course.getCourse($scope.data.dept.toUpperCase())).then(
        function(matches){
          if($scope.data.course !== ''){$scope.data.resultCourse = matches;}
          else {
            $scope.data.resultCourse = [];
          }
        }
      )
    };


    /* After generate schedules, go to detail view */
    
    $scope.generate = function(){
      console.log(scheduleData.getSchedules());
      $state.go('main.my-schedule')
    };


})
