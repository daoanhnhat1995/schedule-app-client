/**
 */
angular.module('parse-starter.factories')
.factory('Core', ['Schedule','$localstorage','semesterAPI',
    'classAPI','$ionicPopup','$state','$ionicLoading',
    function (Schedule,$localstorage,semesterAPI,classAPI,$ionicPopup,$state,$ionicLoading) {

        var core = {};

        core.userSignup = function (username,fn,ln,email,password) {

            var user = new Parse.User();
            user.set("username", username);
            user.set("password", password);
            user.set("email", email);
            user.set("fn", fn);
            user.set("ln", ln);

            user.signUp(null, {
                success: function(user) {
                  $state.go('login');
                },
                error: function(user, error) {
                    $ionicPopup.alert({
                        title: 'Oops',
                        template: user.message,
                        okType: 'button-clear'
                    });
                }
            });


        };

        core.userLogin = function (username,password) {

            function cache(){
                         console.log("Semesters cached :" + $localstorage.get("semesters").length);
                        console.log("Courses cached :" + $localstorage.get("courses").length);
                        console.log("Done caching...");
                         $ionicLoading.hide();
                          $state.go('main.dashboard');
                      }


            $ionicLoading.show({template:'<ion-spinner></ion-spinner>'});
            Parse.User.logIn(username, password, {
                success: function(user) {
                   
                    console.log("Caching....");


                   (function(){
                    semesterAPI.getAll(next).then(function(d){
                        $localstorage.set('semesters',d.data);
                        next(loadSchedule);

                         });

                      function next(loadSchedule){
                        classAPI.getAll(cache).then(function(d){
                        $localstorage.set('courses',d.data);
                        loadSchedule(cache);
                         });
                        }

                        function loadSchedule(cache){
                            //get current schedule
                            var schedule = user.get("schedules");
                            if(schedule != undefined){
                                Schedule.setSchedule2(JSON.parse(schedule));
                                console.log(Schedule.getSchedule());
                            } else {
                                console.log("Found nothing, you have 0 schedule ....");
                            }
                            cache();
                        }

                    })();
                


                   
                },
                error: function(user, error) {
                    $ionicLoading.hide();
                    console.log(user);
                    $ionicPopup.alert({
                        title: 'Oops',
                        content:user.message,
                        okType: 'button-clear'
                    });
                }
            });

        };

        core.userReset = function (email) {

            Parse.User.requestPasswordReset(email, {
                success: function() {
                    // Password reset request was sent successfully
                    $ionicPopup.alert({
                        title: 'Success',
                        content: 'password was sent to '+email,
                        okType: 'button-clear'
                    });
                    $state.go('login');
                },
                error: function(error) {
                    // Password reset failed
                    $ionicPopup.alert({
                        title: 'Sorry',
                        content: "Something went wrong",
                        okType: 'button-clear'
                    });
                     $state.go('login');

                }   
            });
        };


        return core;
    }])


    // Local Storage data service
    .factory('$localstorage',['$http',function($http){
      return {
         set:function(key,value){
         return localStorage.setItem(key,JSON.stringify(value));
       },
       get:function(key){
         return JSON.parse(localStorage.getItem(key));
       },
       destroy:function(key){
         return localStorage.removeItem(key);
       },
       clear: function(){
        localStorage.clear();
       }
     };
    }])

    
