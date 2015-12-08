
angular.module('parse-starter.controllers')
    .controller('HomeCtrl',function ($scope,Cart,$localstorage,$state,$ionicPopup) {

        $scope.currentUser = Parse.User.current()._serverData;


        $scope.back = function () {
            $ionicHistory.goBack();
        };

        $scope.fetch = function(){
            console.log( Parse.User.current().get("schedule"));
        }

        $scope.logout = function () {

            $ionicPopup.confirm({
                title: 'LOG OUT',
                template: 'Are you sure?',
                okType: 'button-balanced'
            }).then(function(res) {
                if(res) {
                    $localstorage.set("schedules",[]);
                    $localstorage.set("courses",[]);
                    Cart.clear();

                    Parse.User.logOut();
                    $state.go('login');
                } else {
                }
            });



        };
    });