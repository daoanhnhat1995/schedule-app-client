angular.module('parse-starter.controllers')
	.controller('editBlockTimeCtrl',function($scope,$state,$ionicPopup,blockTimeData){

		
		$scope.block = {};
		

	   
	    $scope.saveBlock = function(){
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
