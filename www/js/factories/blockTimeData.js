/*
* This factory stores block times from the users and default system 
*/

angular.module("parse-starter.factories")
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