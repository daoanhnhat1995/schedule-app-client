angular.module('parse-starter.factories')
	.factory('Cart',function(_){
		 var courses = [];
		  return {
		    add: function(val){
		    	val.checked = true;
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
		    },
		    getSelected: function(){
		    	return _.filter(courses,function(c){return c.checked == true});
		    },
		    clear: function(){
		    	courses = [];
		    }
		  }
	})




	.factory('semesterData',function(_){
		var semester = {};
		semester.name = "Select Semester";
		var ready = false;
		var list = [];
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
				return list;
			},
			setData: function(data){
				list = data;
			},
			isAddReady: function(){
				return ready;
			}
		}
	})



	.factory('blockTimeData',function($state,$ionicPopup){
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

				block.start_time = block.startT.getHours()+":"+block.startT.getMinutes()+":"+block.startT.getSeconds();
				block.end_time = block.endT.getHours()+":"+block.endT.getMinutes()+":"+block.endT.getSeconds();

			

				if(!_.contains(timeData,block)){
					timeData.push(block);
					$state.go("main.block-time-index");
				} else {
					$ionicPopup.alert({
						title: "Oops",
						template: "This block time has been reserved"
					});
				}
				
			},


			getBlockTime: function(){
				return timeData;
			},

			options: function(){

				l = ["Commute Time","Study Time","Work Time","Sleep Time"];
				return l;
			},
			getSelected: function(){
				return _.filter(timeData,function(each){return each.checked == true});
			}


		}

	})
