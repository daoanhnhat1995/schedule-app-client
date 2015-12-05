angular.module('parse-starter.factories')
	.factory('Cart',function(_){
		 var courses = [];
		  return {
		    add: function(val){
		    	if(!_.contains(courses,val)){
		     	courses.push(val);
		   		  } 
		     		      
		    },
		    getAll: function(){
		    	console.log(courses);
		      return courses;
		    },
		    remove: function(c){
		      courses.splice(courses.indexOf(c),1);
		    }
		  }
	})




	.factory('semesterData',function(){
		var semester = "Select Semester";
		var ready = false;
		return {

			getSemester: function(){
				return semester;
			},
			setSemester: function(input){
				if(input != "Select Semester" | input != ""){
					ready = false;
				} else{
					ready == true;
				}
				semester = input;
			},
			getListSemester: function(){
				list = ['Fall 2015','Spring 2017','Summer 2017'];
				return list;
			},
			isAddReady: function(){
				return ready;
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