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


    /**
     *
     * Deep copy an object
     *
     */
    
     function deepCopy(a){
      return JSON.parse(JSON.stringify(a));
     }


      /*
      * compare 2 blocks of time
      */
      function compare(a,b){
        var joint_dates = _.intersection(a["dates"],b["dates"]);
        // console.log("Join dates are " + joint_dates);

        if(joint_dates.length == 0 | joint_dates === undefined){
          return true;
        
        } 

        return a.start_time > b.end_time | a.end_time < b.start_time
      }


      /**
       *
       * check if a list of time blocks overlaps each other
       * each member needs to be unique
       */
      
    var isOverlap = function(array){
      var temp;
      var l;
      var res = true;

      var arr = deepCopy(array);
      /*----------  enumerate through each item  ----------*/
      while(arr.length>0){

        temp = arr.pop();

        l = _.filter(arr,function(each){return compare(temp,each) == false});
        if(l.length > 0 ){
          // res = false;
          // break;
          res = _.toArray([temp,l])
          break;
        } else {
          res = array;
        }


      }
      return res;
    }

    function jointTable(arr){
      if(arr.length == 1){
        return arr[0];
      } else {
        var res = [];
       
        var restArr = jointTable(arr.slice(1));

       
        for(var i = 0; i< restArr.length;i ++){
          for(var j = 0; j < arr[0].length; j++){
            res.push(_.flatten([arr[0][j],restArr[i]]));
          }
        }
        return res;
      }
    }

    var isConflict = function(blockArr,Arr){
      //start with block time interval
      // add first one to list
      // var conflict_list;

      // /*----------  deep copy of arrays  ----------*/
      // var block_list = deepCopy(blockArr);
      var courses = deepCopy(Arr);
      var course_list = _.groupBy(Arr,'course_id');
      delete course_list.undefined;
      var key_list = _.keys(course_list);
      console.log(key_list);
      console.log(_.toArray(course_list));
      var list =  jointTable(_.toArray(course_list));
      console.log(list);
      var res = [];
      var temp;
      angular.forEach(list,function(each){
        each = _.flatten([each]);
        console.log(isOverlap(each.concat(blockArr)));
        res.push(isOverlap(each.concat(blockArr)));
      });
              console.log(list.length);
              console.log(res.length);
      return res;

      // var temp_list = deepCopy(blockArr);
      // var table = [];

      // var temp;
      /*----------  Create a joint table  ----------*/

    }



    return {search: search, isOverLap: isOverlap, isConflict: isConflict}
  })

