angular.module("parse-starter.controllers")
  .controller("GenerateCtrl", function($scope,$state,$ionicPopup,Schedule,Department){
    $scope.listClass = Schedule.getListClass();

    // remove class from list
    $scope.remove = function(each){
      Schedule.removeClass(each);
    };

    //add class to list
    $scope.add = function(){
      $scope.item = {};
      $ionicPopup.confirm({
          title: 'Add class',
          templateUrl: "templates/schedule/add-class.html",
          scope: $scope,
          okType: 'button-balanced'
      }).then(function(res) {
          if(res) {
            Schedule.addClass($scope.item.department,$scope.item.class);
          } else {
          }
      });


    };

})

  .controller('FilterData',function($scope,Department){
    //filter
    $scope.data = {'departments': [], 'search': ''}
    $scope.change = function(){
      $scope.data.departments = [];
    }
    $scope.in = Department.getDepartments()[0]['name'];

    $scope.search = function(){
      Department.searchDepartment($scope.data.search).then(
        function(matches){
          if($scope.data.search !== '')
          { $scope.data.departments = matches;
        }
        else{
          $scope.data.departments = [];
        }
        }

      )
    };

    console.log(Department.getDepartments());
  })
