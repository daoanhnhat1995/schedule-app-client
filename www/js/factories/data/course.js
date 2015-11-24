angular.module('parse-starter.factories')
	.factory('courseData',function(){
		course = {};
		list = ["CSE 1310","MATH 3330","CSE 3330"];

		return {
			getCourseList: function(){
				return list;
			}
		}
	})