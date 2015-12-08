angular.module('parse-starter.factories')
  .factory('Filter',function($q,$timeout,_){


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


        function interval(a,b){
          return Date.parse(a)-Date.parse(b);
        }
        var in_a = interval(a.end_time,a.start_time);
        var in_b = interval(b.end_time,b.start_time);
        if ((a.start_time < b.start_time) &&(interval(b.start_time,a.start_time) < in_a)){
          return false;
        } else if ((a.start_time > b.start_time) &&(interval(b.start_time,a.start_time) < in_b)){
          return false;
        } else {
          return true;
        }
      }


      /**
       *
       * check if a list of time blocks overlaps each other
       * each member needs to be unique
       */
      
    var isOverlap = function(array){
      var temp;
      var l;
      var res = {};
      res.isConflict = false;

      var arr = deepCopy(array);
      /*----------  enumerate through each item  ----------*/
      while(arr.length>0){

        temp = arr.pop();

        l = _.filter(arr,function(each){return compare(temp,each) == false});
        if(l.length > 0 ){
          // res = false;
          // break;
          res.d = _.toArray([temp,l])
          res.isConflict = true;
          break;
        } else {
          res.d = array;
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
     
      var courses = deepCopy(Arr);

       angular.forEach(Arr,function(each){
        console.log(each);
        each.start_time = transform(each.start_time);
        each.end_time = transform(each.end_time);
        console.log(each);
      });
      var course_list = _.groupBy(Arr,'course_id');
      delete course_list.undefined;


        function transform(block){
        var date = new Date("10/10/2010");
        var arr = block.split(":");
        console.log(arr);
        date.setHours(arr[0]);
        date.setMinutes(arr[1]);
        date.setSeconds(arr[2]);

        return date;

        }




      var course_id_list = _.keys(course_list);
      // console.log(key_list);
      // console.log(_.toArray(course_list));
      var list =  jointTable(_.toArray(course_list));
      // console.log(list);
      var res = [];
      var conflicts = [];
      var temp;


      angular.forEach(list,function(each){
        each = _.flatten([each]);
        // console.log(isOverlap(each.concat(blockArr)));
        temp = isOverlap(each.concat(blockArr))
        if(temp.isConflict == true){
          conflicts.push(temp);
        } else {
          res.push(temp);
        }
      });
   
      return {possibles:res,conflicts:conflicts};

    }



    return {isOverLap: isOverlap, isConflict: isConflict}
  })

