angular.module('parse-starter.factories')
	.factory('semesterData',function(){
		this.semester = "";

		return {
			getSemester: function(){
				return this.semester;
			},
			setSemester: function(input){
				this.semester = input;
			},
			getListSemester: function(){
				list = ['Fall 2015','Spring 2017','Summer 2017'];
				return list;
			}
		}
	})