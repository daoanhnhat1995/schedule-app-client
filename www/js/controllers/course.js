angular.module('parse-starter.controllers')

	/* index */
	.controller('courseListCtrl',function(_,scheduleAPI,$localstorage,$scope,Cart,Schedule,$state){

 		$scope.courses = Cart.getAll();
	    console.log("Current courses in art are: ")
		console.log($scope.courses);
		$scope.test = function(){
			console.log("courseListCtrl");
		}
		$scope.save = function(){
			current = [];
			var temp;


			/* Important, have to reset everytime */
			$localstorage.set('schedules',[]);
			angular.forEach(Cart.getAll(),function(each){
				/* Check if class is marked selected */
				if(each.checked == true){

					current.push(each);

					scheduleAPI.get(each.course_id,callback).then(function(d){
						temp = $localstorage.get('schedules');
						temp.push(d.data);
						$localstorage.set('schedules',_.flatten(temp));
						callback(d.data);
					});


					function callback(){
						console.log("Courses selected are : ")
						console.log(Cart.getSelected());
						console.log("Fetched schedules ....");
						console.log($localstorage.get("schedules"));
					}
				}
				
			});
			

			
			
			$state.go("main.generate-schedule");

			
		};

		
	})


	/* edit */

	.controller('cartCtrl',
		function($scope,$state,_,$localstorage,classAPI,semesterAPI,Schedule,Filter,Cart,semesterData){
		
			/**
			 *
			 * Loads cached semester and course catalog data for search
			 *
			 */
			
			$scope.courses = $localstorage.get("courses");
			console.log("Loaded " + $scope.courses.length + " courses from local storage");
			$scope.semesterList = $localstorage.get("semesters");
			console.log("Loaded " + $scope.semesterList.length + " semesters from local storage");

				// $scope.$evalAsync(function(){
				// 	$scope.semesterList = d.data;
				// });
			
			$scope.semester = semesterData.getSemester(); //holds current selected semester
		   	$scope.listClass = Cart.getAll(); //holds list of selected classes
		   	$scope.ready = false; //check if semester is selected
		   	$scope.course; //holds current selected course;
		   
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
		   		console.log("Added class "+a.course_title+" to cart!");
		   	};
		    /*
		    * Remove a class from list
		    */
		    $scope.remove = function(a){

		      Cart.remove(a);
		      console.log("Removed "+a.course_title + " from cart!")
		    };

	})