angular.module('parse-starter.controllers')
	.controller('blockTimeCtrl',function($scope,$state,$ionicPopup,blockTimeData){

		
		$scope.block = {}
		

	    $scope.days = ["M","Tu","W","Th","F","S"]

	    // blockTimeData.addBlock($scope.startT,$scope.endT,["M"]);
	    // console.log(blockTimeData.getBlockTime());

	    $scope.saveBlock = function(){
	    	console.log($scope.block);
	    	blockTimeData.addBlock($scope.block);
	    	$state.go("main.time-setting");

	    }


	})
