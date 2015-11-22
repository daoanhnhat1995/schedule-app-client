angular.module('parse-starter.controllers')
	.controller('blockTimeCtrl',function($scope,$ionicPopup){

		$scope.timePickerObject24Hour = {
		      inputEpochTime: ((new Date()).getHours() * 60 * 60 + (new Date()).getMinutes() * 60),  //Optional
		      step: 15,  //Optional
		      format: 24,  //Optional
		      titleLabel: 'Select Block Time',  //Optional
		      closeLabel: 'X',  //Optional
		      setLabel: 'Ok',  //Optional
		      setButtonType: 'button-balanced',  //Optional
		      closeButtonType: 'button-positive',  //Optional
		      callback: function (val) {    //Mandatory
		        timePicker24Callback(val);
		      }
		    };

		function timePicker24Callback(val) {
	      if (typeof (val) === 'undefined') {
	        console.log('Time not selected');
	      } else {
	        $scope.timePickerObject24Hour.inputEpochTime = val;
	        var selectedTime = new Date(val * 1000);
	        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
	      }
	    }


	})
