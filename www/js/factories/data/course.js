angular.module('parse-starter.factories')
	.factory('Cart',function(_){
		 var courses = [];
		  return {
		    add: function(c){
		    	if(!_.contains(courses,c)){
		     	courses.push(c);
		     }
		     		      
		    },
		    getAll: function(){

		      return courses;
		    },
		    remove: function(c){
		      courses.splice(courses.indexOf(c),1);
		    }
		  }
	})