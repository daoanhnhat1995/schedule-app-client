angular.module('parse-starter.controllers')

	/* index */
	.controller('courseListCtrl',function(_,scheduleAPI,sessionService,$scope,Cart,Schedule,$state){

		$scope.courses = Cart.getAll();
		
		$scope.save = function(){
			current = [];
			angular.forEach(Cart.getAll(),function(each){
				if(each.checked == true){
					current.push(each);
				}
			});
			Schedule.setCourses(current);
			var temp;
			angular.forEach(current,function(course){
				scheduleAPI.get(course.course_id).then(function(d){
					console.log(course.course_id);
					console.log(d.data);
					temp = sessionService.get('scheduleList');
					if (temp == null){
						temp = [];
					}
					temp.push(d.data);
					sessionService.set("scheduleList",_.flatten(temp));

				})
			});

			console.log(sessionService.get("scheduleList"));
			$state.go("main.generate-schedule");

			
		};

		
	})


	/* edit */

	.controller('cartCtrl',
		function($scope,$state,_,sessionService,classAPI,semesterAPI,Schedule,Filter,Cart,Course,Department,semesterData,scheduleData){
			


			
			$scope.semesterList = sessionService.get("semesterData");
			$scope.courses = sessionService.get("classData");

			$scope.semester = semesterData.getSemester();
		   	$scope.listClass = Cart.getAll();
		   	$scope.ready = false;


		   	$scope.course;
		   	/**
		   	 *
		   	 * Watch semester and add button
		   	 *
		   	 */
	
		   	$scope.setSemester = function(){
		   		semesterData.setSemester(this.semester);
		   		if(this.semester.name!= "Select semester" && this.semester.name != undefined ){
		   			$scope.ready = true;
		   		} else {
		   			$scope.ready = false;
		   		}

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