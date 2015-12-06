angular.module('parse-starter.factories')
	.factory('Cart',function(_){
		 var courses = [];
		  return {
		    add: function(val){
		    	val.checked = true;
		    	if(!_.contains(courses,val)){

		     	courses.push(val);
<<<<<<< HEAD
		   		  } 
		     		      
=======
		   		  }

>>>>>>> 086bc156526041c97987d5fa9595a3f2570a77c2
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

<<<<<<< HEAD
			addBlock: function(block){	
				block.dates = [];
				angular.forEach(block.dayList,function(value,key){
					this.push(key);
				},block.dates);	

			
=======
			addBlock: function(block){
				block.dates = [];
				angular.forEach(block.dayList,function(value,key){
					this.push(key);
				},block.dates);


>>>>>>> 086bc156526041c97987d5fa9595a3f2570a77c2
				if(!_.contains(timeData,block)){
					timeData.push(block);
					$state.go("main.block-time-index");
				} else {
					window.alert("Duplication!");
				}
<<<<<<< HEAD
				
			},

			
=======

			},


>>>>>>> 086bc156526041c97987d5fa9595a3f2570a77c2
			getBlockTime: function(){
				return timeData;
			},

			options: function(){
<<<<<<< HEAD
				l = ["Commute Time","Study Time","Work Time"];
=======
				l = ["Commute Time","Study Time","Work Time","Sleep Time"];
>>>>>>> 086bc156526041c97987d5fa9595a3f2570a77c2
				return l;
			}


		}
<<<<<<< HEAD
	})
=======
	})
>>>>>>> 086bc156526041c97987d5fa9595a3f2570a77c2
