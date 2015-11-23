angular.module('parse-starter.controllers')
	.controller('blockTimeCtrl',function($scope,$state,$ionicPopup,blockTimeData){

		
		$scope.block = {}
		$scope.startTime = {
		      inputEpochTime: ((new Date()).getHours() * 60 * 60 + (new Date()).getMinutes() * 60),  //Optional
		      step: 15,  //Optional
		      format: 24,  //Optional
		      titleLabel: 'Select Block Time',  //Optional
		      closeLabel: 'X',  //Optional
		      setLabel: 'Ok',  //Optional
		      setButtonType: 'button-assertive',  //Optional
		      closeButtonType: 'button-dark',  //Optional
		      callback: function (val) {    //Mandatory
		        time1callBack(val);
		      }
		    };

		 function time1callBack(val) {
	      if (typeof (val) === 'undefined') {
	        console.log('Time not selected');
	      } else {
	        $scope.startTime.inputEpochTime = val;
	        t = new Date(val*1000);

	        $scope.block.startT = t.getUTCHours() + " : " + t.getUTCMinutes();	      
	        
	       }
	    }

		$scope.endTime = {
		      inputEpochTime: ((new Date()).getHours() * 60 * 60 + (new Date()).getMinutes() * 60),  //Optional
		      step: 15,  //Optional
		      format: 24,  //Optional
		      titleLabel: 'Select Block Time',  //Optional
		      closeLabel: 'X',  //Optional
		      setLabel: 'Ok',  //Optional
		      setButtonType: 'button-balanced',  //Optional
		      closeButtonType: 'button-assertive',  //Optional
		      callback: function (val) {    //Mandatory
		        time2callBack(val);
		      }
		    };


	    function time2callBack(val) {
	      if (typeof (val) === 'undefined') {
	        console.log('Time not selected');
	      } else {
	        $scope.endTime.inputEpochTime = val;
	        t = new Date(val * 1000);
	          $scope.block.endT = t.getUTCHours() + " : " + t.getUTCMinutes();
	 	 }
		}

	    $scope.days = ["M","Tu","W","Th","F","S"]

	    // blockTimeData.addBlock($scope.startT,$scope.endT,["M"]);
	    // console.log(blockTimeData.getBlockTime());

	    $scope.saveBlock = function(){
	    	console.log($scope.block);
	    	blockTimeData.addBlock($scope.block);
	    	$state.go("main.time-setting");

	    }


	})
