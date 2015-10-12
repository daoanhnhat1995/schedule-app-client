angular.module("parse-starter.controllers")
  .controller("GenerateCtrl", function($scope,$state,$ionicPopup,Schedule){
    $scope.listClass = Schedule.getListClass();

    $scope.remove = function(){
      Schedule.remove();
    }
    $scope.add = function(){
      $scope.item = {};
      $ionicPopup.confirm({
          title: 'Add class',
          templateUrl: "templates/schedule/add-class.html",
          scope: $scope,
          okType: 'button-balanced'
      }).then(function(res) {
          if(res) {

            //add class to list
            Schedule.addClass($scope.item.department,$scope.item.class);
          } else {
          }
      });


    };

});
