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
			$scope.semester = "Select semester";
		   	$scope.listClass = Cart.getAll();
		   	$scope.ready = false;
		   	$scope.courses = Course.getAll();
		   	$scope.course;
		   	/**
		   	 *
		   	 * Watch semester and add button
		   	 *
		   	 */
		   	
		   	$scope.setSemester = function(){
		   		semesterData.setSemester(this.semester);
		   		if(this.semester!= "Select semester" && this.semester.length > 0 ){
		   			$scope.ready = true;
		   		} else {
		   			$scope.ready = false;
		   		}
		   		console.log($scope.ready);
		   	}
		   	$scope.addClass = function(a){
		   		Cart.add(a);
		   		// console.log($scope.listClass);
		   	};
		    /*
		    * Remove a class from list
		    */
		    $scope.remove = function(each){
		      Cart.remove(each);
		    };


		    /* After generate schedules, go to detail view */
		    
		    $scope.generate = function(){
		      console.log(scheduleData.getSchedules());
		      $state.go('main.my-schedule')
		    };


	})