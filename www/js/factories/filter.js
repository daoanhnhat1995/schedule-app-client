angular.module('parse-starter.factories')
  .factory('Filter',function($q,$timeout,_){
    var search = function(searchFilter,target) {

      console.log('Searching for ' + searchFilter);

      var deferred = $q.defer();

      var matches = target.filter( function(obj) {
          if(obj.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 )
           return true;
      });

      $timeout( function()
      {
        deferred.resolve( matches );
      }, 50);

      return deferred.promise;

    };

var match2 = function(arr){


      /*
      * Take  2 times, find 
      */
      function compare(a,b){
        var dates_a = _.pluck(a,'dates');
        var dates_b = _.pluck(b,'dates');
        var joint_dates = _.intersection(dates_a,dates_b);
        console.log(joint_dates);

        if(joint_dates.length == 0){
          return true;
        
        } 

        return a.start_time > b.end_time | a.end_time < b.start_time
      }

      var temp;
      var l;
      var res = true;
      while(arr.length>0){
        temp = arr.pop();
        l = _.filter(arr,function(each){return compare(temp,each) == false});
        if(l.length > 0 ){
          res = false;
          break;
        }


      }
      return res;
    }


    var match = function(list){


      /*
      * Take  2 times, find 
      */
      function compare(a,b){
        var dates_a = _.pluck(a,'dayList');
        var dates_b = _.pluck(b,'dayList');
        var joint_dates = _.intersection(dates_a,dates_b);
        console.log(joint_dates);

        if(joint_dates.length == 0){
          return true;
        
        } 

        return a.startT > b.endT | a.endT < b.startT 
      }

      var temp;
      var l;
      var res = true;
      var arr = list;
      while(arr.length>0){
        temp = arr.pop();
        l = _.filter(arr,function(each){return compare(temp,each) == false});
        if(l.length > 0 ){
          res = false;
          break;
        }


      }
      return res;
    }

    return {search: search, match: match,match2: match2}
  })

