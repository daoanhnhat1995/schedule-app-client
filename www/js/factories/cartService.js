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



	.factory('blockTimeData',function($state){
		var timeData = [];
		return{

			/*
			* Add a block to timeData list
			*/

			addBlock: function(block){	
				block.dates = [];
				angular.forEach(block.dayList,function(value,key){
					this.push(key);
				},block.dates);	

			
				if(!_.contains(timeData,block)){
					timeData.push(block);
					$state.go("main.block-time-index");
				} else {
					window.alert("Duplication!");
				}
				
			},

			
			getBlockTime: function(){
				return timeData;
			},

			options: function(){
				l = ["Commute Time","Study Time","Work Time"];
				return l;
			}


		}
	})