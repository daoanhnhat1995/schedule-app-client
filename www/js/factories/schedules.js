angular.module('parse-starter.factories')

.factory('Schedule',function($ionicPopup){
  var schedule = {};
  var listClass = [];
  return {
    addClass: function(deptName,className){
      //add a class to the list view
      listClass.push({
        department: deptName,
        class: className
      });
    },
    getListClass: function(){
      return listClass;
    },
    removeClass: function(classname){
      listClass.splice(listClass.indexOf(classname),1);
    }
  }
})
