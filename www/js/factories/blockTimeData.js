/*
* This factory stores block times from the users and default system 
*/

angular.module("parse-starter.factories")
	.factory('blockTimeData',function(){
		var timeData = [];
		return{

			
			addBlock: function(block){	/* add a time block to list */
				
				timeData.push(block);

			},

			/* return block time list */
			getBlockTime: function(){
				return timeData;
			}


		}
	})