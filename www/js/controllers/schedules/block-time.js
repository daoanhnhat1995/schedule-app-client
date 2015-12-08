angular.module('parse-starter.controllers')
  .controller('editBlockTimeCtrl',function($ionicHistory,$scope,$localstorage,$ionicModal,$state,blockTimeData){

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
          endT = newVal[3] != undefined
          $scope.ready = !! ( name && startT && endT);
          console.log($scope.ready);


      });
      $scope.saveBlock = function(){

     
          blockTimeData.addBlock($scope.block);
      };


     
  })

  /* controller for blocktime setting index page */

  .controller('mainBlockTimeCtrl',function(Filter,$ionicModal,$scope,$state,blockTimeData,Schedule){
    $scope.blocks = blockTimeData.getBlockTime();
    $scope.edit = false;
    $scope.enableEdit = function(){
      $scope.edit = true;
    }
    $scope.save = function(){
      current = [];
      angular.forEach($scope.blocks,function(b){
        if(b.checked == true){
          current.push(b);
        }
      });
      Schedule.setBlockTime(current);

      /* Need to link this to a view */
      console.log(Filter.isOverLap(current));
      $state.go('main.generate-schedule');
    };
     $scope.deleteBlock = function(i){
        blockTimeData.deleteBlock(i);
      };  


      $scope.$watch('blocks',function(newVal){
        $scope.blocks = newVal;
      });





  })