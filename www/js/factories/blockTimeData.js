/*
* This factory stores block times from the users and default system 
*/

angular.module("parse-starter.factories")
	.factory('blockTimeData',function(){
		var timeData = [];
		return{

			/*
			* Add a block to timeData list
			*/

			addBlock: function(block){	
				block.days = [];
				angular.forEach(block.dayList,function(value,key){
					this.push(key);
				},block.days);	

				if(block.days.length == 0){
					block.days = "Everyday";
				}

				timeData.push(block);
				
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