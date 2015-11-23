angular.module('parse-starter.controllers')
	.controller('timeSettingCtrl',function($scope,blockTimeData){
		// $scope.blocks = blockTimeData.getBlockTime();
		console.log(blockTimeData.getBlockTime());
		/* sample list , actual is above */
		$scope.blocks = [{name:'Study Time',startT:'9:00 AM',endT:'11:00 AM',days:'M F W'}]

	})