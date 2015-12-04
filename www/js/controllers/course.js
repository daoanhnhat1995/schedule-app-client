angular.module('parse-starter.controllers')

	/* index */
	.controller('courseListCtrl',function($scope,Cart,Schedule,$state){

		$scope.courses = Cart.getAll();
		
		$scope.save = function(){
			current = [];
			angular.forEach(Cart.getAll(),function(each){
				if(each.checked == true){
					current.push(each);
				}
			});
			Schedule.setCourses(current);
			console.log(current);
			$state.go("main.generate-schedule");

			
		};

		
	})


	/* edit */

	.controller('cartCtrl',
		function($scope,$state,$ionicPopup,Schedule,Filter,Cart,Course,Department,semesterData,scheduleData){
			
			$scope.semesterData = semesterData.getListSemester();
			$scope.semester = "Select Semester";
		   	$scope.listClass = Cart.getAll();


		    $scope.$watch("semester",function(newVal){
		    	$scope.ready = (newVal == "Select Semester");
		    	// console.log($scope.ready);
		    });

		    $scope.selectSemester = function(){
		      $ionicPopup.confirm({
		        title: 'Select a semester',
		        templateUrl:'templates/schedule/pick-semester.html',
		        scope: $scope,
		        okType: 'button-dark',
		        controller: 'cartCtrl'
		      });
		    };

		    /*
		    * Remove a class from list
		    */
		    $scope.remove = function(each){
		      Cart.remove(each);
		    };

		     /*
		    * Add a class from list
		    */
		    $scope.add = function(){

		      $ionicPopup.confirm({
		          title: 'Add class',
		          templateUrl: "templates/schedule/add-class.html",
		          scope: $scope,
		          okType: 'button-dark',
		          controller: 'cartCtrl'
		      }).then(function(res) {
		          if(res) {

		          	/*
		          	* Query course and if found, add to cart
		          	*/
		          	var course = Course.findCourse($scope.data.dept.toUpperCase(),$scope.data.course);
		          	console.log(course);
		            if(course != undefined){
		            	course.checked = true;

		            	Cart.add(course);
		            }

		            /* reset main list */
		            Schedule.setCourses(Cart.getAll());
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

		      Filter.search($scope.data.dept.toUpperCase()+" " +$scope.data.course,Course.getCourse($scope.data.dept.toUpperCase())).then(
		        function(matches){
		          if($scope.data.course !== ''){

		          	$scope.data.resultCourse = matches;

		          }else {
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