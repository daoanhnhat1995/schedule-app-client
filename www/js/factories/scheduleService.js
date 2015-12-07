angular.module('parse-starter.factories')

.factory('Schedule',function($ionicPopup,_){
  var schedules = {};
  var listClass = [];
  var blockTime = [];
  return {
  
    setCourses: function(l){
      listClass.splice(0,listClass.length);
      Array.prototype.push.apply(listClass,l);

    },
    getCourses: function(){
      return listClass;
    },
    
    setBlockTime: function(bList){
      blockTime.splice(0,blockTime.length);
      Array.prototype.push.apply(blockTime,bList);
    },
    getBlockTime: function(){
      return blockTime;
    },
    setSchedules: function(list){
      console.log("Grouping schedules....");
      schedules = list;
    },
    getSchedules: function(){
      console.log("Got...")
      console.log(schedules);
      return schedules;
    }
  }
})
