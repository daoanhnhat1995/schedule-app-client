
var link = 'https://utamymavschedule.herokuapp.com/api/';
angular.module('parse-starter.factories')
	.factory("semesterAPI",function($http){
		return {
			getAll: function(){
				return $http.get(link+'semesters');
			}
		}

	})

	.factory("departmentAPI",function($http){
		return{
			get:function(semester){
				return $http.get(link+semester+"/departments");
			}
		}
	})

	.factory("classAPI",function($http){
		return{
			getAll:function(){
				return $http.get(link+'2162/courses');
			}
		}
	})

	.factory("scheduleAPI",function($http){
		return{
			get: function(course){
				var c = course.split(" ");
				return $http.get(link+'2162/'+c[0]+"-"+c[1]+"/classes");

			}
		}
	})