angular.module('parse-starter.factories')

.factory('Schedule',function($ionicPopup,_){
  var schedule = {conflicts:[],schedules:[]};
  var listClass = [];
  var blockTime = [];
  var schedules = {};
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
      schedules.possibleList = _.filter(list,function(each){
        return each.length != 2 
      });

      schedules.conflictList = _.filter(list,function(each){
        return each.length == 2 
      });
    },
    getResult: function(){
      if(schedules.possibleList == 0){
        return {
          conflicts: schedules.conflictList, schedules: []

        }
      } else {
        return {
          conflicts: [],
          schedules: _.flatten(_.sample(schedules.possibleList,1))
        }
      }
    },
    setSchedule: function(arr){
      schedule = arr;
    },
    getSchedule: function(){


      return schedule;
    }


  }
})
