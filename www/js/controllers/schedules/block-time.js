angular.module('parse-starter.controllers')
	.controller('editBlockTimeCtrl',function($scope,$ionicModal,$state,$ionicPopup,blockTimeData){

		
		$scope.block = {};
	    $scope.optionList = blockTimeData.options();

	    /*
	    * enable save button if these fields are filled
	    */
	    $scope.$watchGroup(['block.name', 'block.days','block.start_time','block.end_time'], function (newVal) {
	      var defaultName = 'Select time name';

	      if(newVal[0] === undefined){
	      	newVal[0] = defaultName;
	      	$scope.block.name = newVal[0];
	      }

	      var name = newVal[0] != defaultName,
	      	
	        startT = newVal[2] != undefined ,
	        endT = newVal[3] != undefined	        
	      	$scope.ready = !! ( name && startT && endT);
	      	console.log($scope.ready);


	    });

	    $scope.saveBlock = function(){

	    	/*
	    	*  Check if block time is appropriate 
	    	*/

	    	if($scope.block.start_time < $scope.block.end_time){
	    		blockTimeData.addBlock($scope.block);
	    	} else {
	    		alert("Bad time interval!");
	    	}

	    }



		


	})

	/* controller for blocktime setting index page */

	.controller('mainBlockTimeCtrl',function(Filter,$ionicModal,$scope,$state,blockTimeData,Schedule){
		$scope.blocks = blockTimeData.getBlockTime();


	   
		$scope.save = function(){
			current = [];
			angular.forEach($scope.blocks,function(b){
				if(b.checked == true){
					current.push(b);
				}
			});
			Schedule.setBlockTime(current);
			console.log(Filter.isOverLap(current));
			$state.go('main.generate-schedule');
		}

		

	})
