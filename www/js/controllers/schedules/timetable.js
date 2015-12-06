
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
                for (var i = startHour; i <= endHour; i++) //from 6am to 24pm
                {
                    tmp.push(('0' + i).slice(-2) + ':00');
                    if (usehalfhour && i <= endHour)
                    {
                        tmp.push(('0' + i).slice(-2) + ':30');
                    }
                }
                for (var i = 0; i <= 5; i++) //from 24pm to 6am
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
            var oneWeek = [];
            var scheduleData = Schedule.getSchedule().schedules ;//REPLACE THIS
            //console.log(scheduleData);

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
                    start_time = scheduleData[i].start_time;
                    end_time = scheduleData[i].end_time;
                    createTimetableBlock(allWeekData[k],scheduleData[i].class_name,
                                start_time,end_time,
                                'ion-university',1,
                                'rgba(0,157,151,0.75)');
                    createTimetableBlock(oneWeek,scheduleData[i].class_name,
                                start_time,end_time,
                                'ion-university',1+k,
                                'rgba(0,157,151,0.75)');
                  }
                }
              }
            }


            /***
            PUSH BLOCK TIME INTO TABLE
            ***/
            //var blocktimeData = blockTimeData.getBlockTime();//REPLACE THIS
            var blocktimeData = [{"name":"Commute Time","dates":["Mo","We","Fr"],"start_time":"6:00:00","end_time":"6:50:00"},
            {"name":"Study Time","dates":["We","Th"],"start_time":"8:00:00","end_time":"9:50:00"}];
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
                    //console.log(blocktimeData[i].start_time);
                    //console.log(blocktimeData[i].end_time);
                    block_start_time = $filter('date')(blocktimeData[i].start_time, 'HH:MM:ss');
                    block_end_time = $filter('date')(blocktimeData[i].end_time, 'HH:MM:ss');

                    if(blocktimeData[i].name == "Commute Time")
                    {
                      blocktime_icon =  'ion-model-s';
                      blocktime_color = 'rgba(18,67,172,0.75)';
                    }
                    else if(blocktimeData[i].name == "Sleep Time")
                    {
                      blocktime_icon =  'ion-ios-moon';
                      blocktime_color = 'rgba(62, 10, 102, 1)';
                    }
                    else if(blocktimeData[i].name == "Study Time")
                    {
                      blocktime_icon =  'ion-ios-bookmarks';
                      blocktime_color = 'rgba(255,113,0,0.75)';
                    }
                    else if(blocktimeData[i].name == "Work Time")
                    {
                      blocktime_icon =  'ion-briefcase';
                      blocktime_color = 'rgba(255,169,0,0.75)';
                    }


                    createTimetableBlock(allWeekData[k],blocktimeData[i].name,
                                block_start_time,block_end_time,
                                blocktime_icon,1,
                                blocktime_color);
                    createTimetableBlock(oneWeek,blocktimeData[i].name,
                                block_start_time,block_end_time,
                                blocktime_icon,1+k,
                                blocktime_color);

                  }
                }
              }
            }

            $scope.allweek = allWeekData;
            $scope.oneWeek = oneWeek;



            function createTimetableBlock(arr,name,start,end,icon,left,color)
            {
              starthour = hmsToHours(start);
              endhour = hmsToHours(end);

            if((starthour > 6 && endhour >6) && (endhour < starthour))//23:30 to 7:00
            {
              arr.push({eventname: name,
                      starthour: start, endhour: end,
                      eventtype: icon,
                      left: (45 *left) + 'px', top: ( (starthour-6) * 120) + 'px',
                      height: ((24-starthour+6) * 120) + 'px', color: color});
              arr.push({eventname: name,
                      starthour: start, endhour: end,
                      eventtype: icon,
                      left: (45 *left) + 'px', top: ( (0) * 120) + 'px',
                      height: ((endhour-6) * 120) + 'px', color: color});
            }
            else if (starthour < 6 && endhour >6)//1:30 to 7:30
            {
              arr.push({eventname: name,
                      starthour: start, endhour: end,
                      eventtype: icon,
                      left: (45 *left) + 'px', top: ( (starthour+18) * 120) + 'px',
                      height: ((6-starthour) * 120) + 'px', color: color});
              arr.push({eventname: name,
                      starthour: start, endhour: end,
                      eventtype: icon,
                      left: (45 *left) + 'px', top: ( (0) * 120) + 'px',
                      height: ((endhour-6) * 120) + 'px', color: color});
            }
            else //normal case
            {
              arr.push({eventname: name,
                      starthour: start, endhour: end,
                      eventtype: icon,
                      left: (45 *left) + 'px', top: ( (starthour-6) * 120) + 'px',
                      height: ((endhour-starthour) * 120) + 'px', color: color});
            }

            };

            function hmsToHours(str) {
              var p = str.split(':'),
                  s = 0, m = 1;

              while (p.length > 0) {
                  s += m * parseInt(p.pop(), 10);
                  m *= 60;
              }

              return s/3600;
            };

            $scope.slideIndex = 0;

                // Called each time the slide changes
              $scope.slideChanged = function(index) {
              $scope.slideIndex = index;

            };

            $scope.activeSlide = function (index) {
                $ionicSlideBoxDelegate.slide(index);
            };

        })
