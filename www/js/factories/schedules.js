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
      listClass.splice(0,listClass.length);
      listClass.push(l);

    },
    getListClass: function(){
      return listClass;
    },
    removeClass: function(classname){
      listClass.splice(listClass.indexOf(classname),1);
    },
    setBlockTime: function(bList){
      blockTime.splice(0,blockTime.length);
      blockTime.push(bList);
      console.log(blockTime);
    },
    getBlockTime: function(){
      return blockTime;
    }

  }
})
