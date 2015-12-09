angular.module('parse-starter.controllers')
       .controller('myTimeTableCtrl', function ($scope, $ionicScrollDelegate,$ionicSlideBoxDelegate, $filter, Schedule,blockTimeData) {

         $scope.lockSlide = function () {
             $ionicSlideBoxDelegate.enableSlide( false );}
           var startHour = 6;
           var endHour = 23;
           var usehalfhour = true;

           $scope.timerleft = '0px';

           $scope.hours = getHours();

           function getHours()
           {
               var tmp = [];
               for (var i = startHour; i <= endHour; i++) //from 6am to 24pm
               {
                   tmp.push(('0' + i).slice(-2) + ':00');
                   if (usehalfhour && i <= endHour)
                   {
                       tmp.push(('0' + i).slice(-2) + ':30');
                   }
               }
               for (var i = 0; i <= 5; i++) //from 24pm to 6am
               {
                   tmp.push(('0' + i).slice(-2) + ':00');
                   if (usehalfhour && i <= endHour)
                   {
                       tmp.push(('0' + i).slice(-2) + ':30');
                   }
               }

               return tmp;
           };

           $scope.gotScrolled = function () {

               $scope.timerleft = $ionicScrollDelegate.getScrollPosition().left + 'px';
               $scope.$apply();

           };


           var week = ["Mo","Tu","We","Th","Fr","Sa","Su"];
           $scope.week = week;
           var wholeWeek = [];
           var scheduleData = Schedule.getSchedule() ;//REPLACE THIS



           var mon = [];
           var tue = [];
           var wed =[];
           var thu = [];
           var fri = [];
           var sat =[];
           var su =[];
           var allWeekData = [mon,tue,wed,thu,fri,sat,su];




           /***
           PUSH CLASS SCHEDULE INTO TABLE
           ***/
           for(var i=0; i < scheduleData.length; i++)//CSE 1310, CSE 2350....
           {//console.log(scheduleData[i]);
             for(var j=0; j <scheduleData[i].dates.length; j++)//mo, wed,...
             {//console.log(scheduleData[i].dates[j]);
               for (var k=0; k < week.length;k++)//mo, tu, wed...
               {
                 if(scheduleData[i].dates[j] == week[k])

                 {
                    //console.log("sechule added:...");
                    //console.log(scheduleData[i]);

                   createClassBlock(allWeekData[k],scheduleData[i],1);
                   createClassBlock(wholeWeek,scheduleData[i],1+k);
                 }
               }
             }
           }


           /***
           PUSH BLOCK TIME INTO TABLE
           ***/
           var blocktimeData = blockTimeData.getSelected();//REPLACE THIS

           console.log("Blocktime...");
           console.log(blocktimeData);
           //var blocktimeData = [{"name":"SleepTime","dates":["Mo","We","Fr"],"startT":"23:00:00","endT":"6:50:00"},
            // {"name":"Study Time","dates":["We","Th"],"startT":"8:00:00","endT":"9:50:00"}];

           var blocktime_icon;
           var blocktime_color;

           for(var i=0; i < blocktimeData.length; i++)
           {
             for(var j=0; j <blocktimeData[i].dates.length; j++)
             {
               for (var k=0; k < week.length;k++)
               {
                 if(blocktimeData[i].dates[j] == week[k] || blocktimeData[i].dates == "Everyday")
                 {
                   createTimeBlock(allWeekData[k],blocktimeData[i],1);
                   createTimeBlock(wholeWeek,blocktimeData[i],1+k);
                 }
               }
             }
           }

           $scope.allweek = allWeekData;
           $scope.wholeWeek = wholeWeek;

           console.log(wholeWeek);
           console.log(allWeekData);


           function createClassBlock(arr,classData,left)
           {
             var class_start_time = $filter('date')(classData.start_time, 'HH:mm:ss');
             var class_end_time = $filter('date')(classData.end_time, 'HH:mm:ss');

             var starthour = hmsToHours(class_start_time);
             var endhour = hmsToHours(class_end_time);

             var name = classData.course_title +"-"+classData.section_id;
             var icon = 'ion-university';
             var class_color = 'rgba(0,157,151,0.75)';

             arr.push({eventname: name,
                     starthour: class_start_time, endhour: class_end_time,
                     location : classData.location,
                     eventtype: icon,

                     left: (40 *left) + 'px', top: ( (starthour-6) * 120) + 'px',
                     height: ((endhour-starthour) * 120) + 'px', color: class_color});
           };

           function createTimeBlock(arr,blockData,left)
           {

             var block_start_time = $filter('date')(blockData.start_time, 'HH:mm:ss');
             var block_end_time = $filter('date')(blockData.end_time, 'HH:mm:ss');

             if(blockData.name == "Commute Time")
             {
               blocktime_icon =  'ion-model-s';
               blocktime_color = 'rgba(18,67,172,0.75)';
             }
             else if(blockData.name == "Sleep Time")
             {
               blocktime_icon =  'ion-ios-moon';
               blocktime_color = 'rgba(62, 10, 102, 1)';
             }
             else if(blockData.name == "Study Time")
             {
               blocktime_icon =  'ion-ios-bookmarks';
               blocktime_color = 'rgba(255,113,0,0.75)';
             }
             else if(blockData.name == "Work Time")
             {
               blocktime_icon =  'ion-briefcase';
               blocktime_color = 'rgba(255,169,0,0.75)';
             }

             var starthour = hmsToHours(block_start_time);
             var endhour = hmsToHours(block_end_time);

           if((starthour > 6 && endhour >6) && (endhour < starthour))//23:30 to 7:00
           {
             arr.push({eventname: blockData.name ,
                     starthour: block_start_time, endhour: block_end_time,
                     eventtype: blocktime_icon,

                     left: (40 *left) + 'px', top: ( (starthour-6) * 120) + 'px',
                     height: ((24-starthour+6) * 120) + 'px', color: blocktime_color});
             arr.push({eventname: blockData.name ,
                     starthour: block_start_time, endhour: block_end_time,
                     eventtype: blocktime_icon,

                     left: (40 *left) + 'px', top: ( (0) * 120) + 'px',
                     height: ((endhour-6) * 120) + 'px', color: blocktime_color});
           }
           else if (starthour < 6 && endhour >6)//1:30 to 7:30
           {
             arr.push({eventname: blockData.name,
                     starthour: block_start_time, endhour: block_end_time,
                     eventtype: blocktime_icon,

                     left: (40 *left) + 'px', top: ( (starthour+18) * 120) + 'px',
                     height: ((6-starthour) * 120) + 'px', color: blocktime_color});
             arr.push({eventname: blockData.name,
                     starthour: block_start_time, endhour: block_end_time,
                     eventtype: blocktime_icon,

                     left: (40 *left) + 'px', top: ( (0) * 120) + 'px',
                     height: ((endhour-6) * 120) + 'px', color: blocktime_color});
           }
           else //normal case
           {
             arr.push({eventname: blockData.name,
                     starthour: block_start_time, endhour: block_end_time,
                     eventtype: blocktime_icon,

                     left: (40 *left) + 'px', top: ( (starthour-6) * 120) + 'px',
                     height: ((endhour-starthour) * 120) + 'px', color: blocktime_color});
           }
         }

           function hmsToHours(str) {
             var p = str.split(':'),
                 s = 0, m = 1;

             while (p.length > 0) {
                 s += m * parseInt(p.pop(), 10);
                 m *= 60;
             }

             return s/3600;
           };


           $scope.slideTimetableIndex = 0;

               // Called each time the slide changes
             $scope.slideTimetableChanged = function(index) {
             $scope.slideTimetableIndex = index;

           };

           $scope.activeTimetableSlide = function (index) {
               $ionicSlideBoxDelegate.slide(index);
           };

       })
