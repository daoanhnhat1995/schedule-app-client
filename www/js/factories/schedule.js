angular.module('parse-starter.factories')
  .factory('Schedule',function(){
    var schedule = {};
    var listClass = [];
    return {
      addClass: function(dept,classname){
        listClass.push({
          department: dept,
          class: classname
        });
      },
      getListClass: function(){
        return listClass;
      },
      removeClass: function(classname){
        listClass.splice(listClass.indexOf(classname),1);
      }
    }
  });
