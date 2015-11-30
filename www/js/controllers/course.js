angular.module('parse-starter.controllers')

	/* index */
	.controller('courseListCtrl',function($scope,courseData,Schedule,$state){
		console.log(courseData.getCartList());

		$scope.selected = courseData.getCartList();
		
		$scope.save = function(){
			current = [];
			angular.forEach($scope.selected,function(each){
				if(each.checked == true){
					current.push(each);
				}
			});
			Schedule.setList(current);

			$state.go("main.generate-schedule");

			
		};

		
	})


	/* edit */

	.controller('cartCtrl',
		function($scope,$state,$ionicPopup,Filter,courseData,Course,Department,
			semesterData,scheduleData)
		{
			$scope.semesterData = semesterData.getListSemester();

		    $scope.semester = {};
		    if(typeof($scope.semester.name) == "undefined"){
		      $scope.semester.name = "Select semester";
		    }


		    $scope.listClass = courseData.getCartList();

		    $scope.selectSemester = function(){
		      $ionicPopup.confirm({
		        title: 'Select a semester',
		        templateUrl:'templates/schedule/pick-semester.html',
		        scope: $scope,
		        okType: 'button-dark',
		        controller: 'cartCtrl'
		      }).then(function(r){
		        semesterData.setSemester($scope.semester.name);
		        console.log(semesterData.getSemester());
		        
		      });
		    };
		    /* remove class from list of classes */
		    $scope.remove = function(each){
		      courseData.removeClass(each);
		    };

		    /* add class to list of classes */
		    $scope.add = function(){

		      $ionicPopup.confirm({
		          title: 'Add class',
		          templateUrl: "templates/schedule/add-class.html",
		          scope: $scope,
		          okType: 'button-dark',
		          controller: 'cartCtrl'
		      }).then(function(res) {
		          if(res) {
		            courseData.addClass($scope.data.dept,$scope.data.course);
		            $scope.data.dept = '';
		            $scope.data.course = '';
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