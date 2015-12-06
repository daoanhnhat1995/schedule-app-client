angular.module('parse-starter.factories')
	.factory("semesterAPI",function($http){
		return {
			getAll: function(){
				return $http.get('http://localhost:5000/api/semesters');
			}
		}

	})

	.factory("departmentAPI",function($http){
		return{
			get:function(semester){
				return $http.get('http://localhost:5000/api/'+semester+"/departments");
			}
		}
	})

	.factory("classAPI",function($http){
		return{
			getAll:function(){
				return $http.get('http://localhost:5000/api/2162/courses');
			}
		}
	})

	.factory("scheduleAPI",function($http){
		return{
			get: function(course){
				var c = course.split(" ");
				return $http.get('http://localhost:5000/api/2162/'+c[0]+"-"+c[1]+"/classes");

			}
		}
	})