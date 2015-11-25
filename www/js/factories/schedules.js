angular.module('parse-starter.factories')

.factory('Schedule',function($ionicPopup){
  var schedule = {};
  var listClass = [];
  var blockTime = [];

  return {
    addClass: function(obj){
    //add a class to the list view
      listClass.push(obj);
    },
    setList: function(l){
      listClass = l;

    },
    getListClass: function(){
      return listClass;
    },
    removeClass: function(classname){
      listClass.splice(listClass.indexOf(classname),1);
    },
    setBlockTime: function(bList){
      blockTime = bList;
      console.log(bList);
    },
    getBlockTime: function(){
      return blockTime;
    }

  }
})
