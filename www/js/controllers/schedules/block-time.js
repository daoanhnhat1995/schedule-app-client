angular.module('parse-starter.controllers')
	.controller('editBlockTimeCtrl',function($scope,$state,$ionicPopup,blockTimeData){

		
		$scope.block = {};
		

	  

	    $scope.optionList = blockTimeData.options();

	   

	    /*
	    * enable save button if these fields are filled
	    */
	    $scope.$watchGroup(['block.name', 'block.days','block.startT','block.endT'], function (newVal) {
	      var defaultName = 'Select time name';

	      if(newVal[0] === undefined){
	      	newVal[0] = defaultName;
	      	$scope.block.name = newVal[0];
	      }

	      var name = newVal[0] != defaultName,
	      	
	        startT = newVal[2] != undefined ,
	        endT = newVal[3] != undefined ;
	      	$scope.ready = !! ( name && startT && endT );
	      	console.log($scope.ready);


	    });

	    $scope.saveBlock = function(){
	    	console.log($scope.block);
	    	blockTimeData.addBlock($scope.block);
	    	$state.go("main.block-time-index");

	    }

	    $scope.selectName = function(){
	    	 $ionicPopup.confirm({
		        title: 'Select a name',
		        templateUrl:'templates/blocktimes/pick-name.html',
		        scope: $scope,
		        okType: 'button-dark',
		        controller: 'editBlockTimeCtrl'
		      })
	    }




	})

	/* controller for blocktime setting index page */

	.controller('mainBlockTimeCtrl',function($scope,$state,blockTimeData,Schedule){
		$scope.blocks = blockTimeData.getBlockTime();

		$scope.save = function(){
			current = [];
			angular.forEach($scope.blocks,function(b){
				if(b.checked == true){
					current.push(b);
				}
			});
			Schedule.setBlockTime(current);
			$state.go('main.generate-schedule');
		}

		

	})
