angular.module('parse-starter.controllers')
	.controller('editBlockTimeCtrl',function($scope,$state,$ionicPopup,blockTimeData){

		
		$scope.block = {};
		

	    $scope.days = ["M","Tu","W","Th","F","S"];

	    // blockTimeData.addBlock($scope.startT,$scope.endT,["M"]);
	    // console.log(blockTimeData.getBlockTime());

	    $scope.saveBlock = function(){
	    	console.log($scope.block);
	    	blockTimeData.addBlock($scope.block);
	    	$state.go("main.block-time-index");

	    };

	    $scope.option = {};
	    if( typeof($scope.block.name) == "undefined"){
	    	$scope.block.name = "Select block time name";
	    }

	    $scope.optionList = blockTimeData.options();

	    console.log($scope.optionList);

	    $scope.selectName = function(){
	    	 $ionicPopup.confirm({
		        title: 'Select a name',
		        templateUrl:'templates/blocktimes/pick-name.html',
		        scope: $scope,
		        okType: 'button-dark',
		        controller: 'editBlockTimeCtrl'
		      }).then(function(r){
		        
		        console.log($scope.option.name);
		        $scope.block.name = $scope.option.name;
		        
		      });
	    }




	})

	/* controller for blocktime setting index page */

	.controller('mainBlockTimeCtrl',function($scope,blockTimeData){
		$scope.blocks = blockTimeData.getBlockTime();

	})
