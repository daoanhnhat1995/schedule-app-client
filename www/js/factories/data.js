angular.module('parse-starter.factories')
.factory('classData',function(){
  var classes = [{"id":2118,"class_id":24865,"instructor":"Eric W Becker","section_id":"001","section_type":"LEC","meeting_time":"01/19/2016 - 05/06/2016","start_time":"10:00:00","end_time":"10:50:00","location":"TBA","course_id":668,"dates":["Mo"]},
                {"id":2119,"class_id":24868,"instructor":"Eric W Becker","section_id":"002","section_type":"LEC","meeting_time":"01/19/2016 - 05/06/2016","start_time":"10:00:00","end_time":"10:50:00","location":"TBA","course_id":668,"dates":["We"]},
                {"id":2120,"class_id":30278,"instructor":"Eric W Becker","section_id":"003","section_type":"LEC","meeting_time":"01/19/2016 - 05/06/2016","start_time":"10:00:00","end_time":"10:50:00","location":"TBA","course_id":668,"dates":["Fr"]}
              ];

return {
  getClasses: function(){
    return classes;
  }
}

})

// .factory('blockTime',fucntion(){
// })
.factory('Course',function(){

  var courses = {
    'CSE':[{'name':'1310'},{'name':'2310'},{'name':'1120'}],
    'MATH':[{'name':'2222'},{'name':'2221'},{'name':'2223'}]
  };

  return{
    getCourse: function(courseName){
      return courses[courseName]
    }
  }
})

  .factory('Department',function($q,$timeout){

    //seeding data for list of departments for now
    var departments = [
      {
        'id' : 0,
        'name': 'CSE'
      },
      {
        'id': 1,
        'name': 'CE'

      },
      {
        'id': 2,
        'name': 'MATH'
      },
      {
        'id':3,
        'name':'POLCS'
      },
      {
        'id':4,
        'name':'HIST'
      }
    ];


    return {
      getDepartments : function(){
      return departments;
      }
    }
  })

  .factory('scheduleData',function(){
    var schedules = [
      {"class_name":'CSE 1310',"id":2125,"class_id":41173,"instructor":"Terrance Moore","section_id":"001","section_type":"LEC","meeting_time":"01/19/2016 - 05/06/2016","start_time":"19:00:00","end_time":"20:20:00","location":"TBA","course_id":670,"dates":["Tu","Th"]},
      {"class_name":'CSE 2350',"id":2126,"class_id":24892,"instructor":"Vassilis Athitsos","section_id":"003","section_type":"LEC","meeting_time":"01/19/2016 - 05/06/2016","start_time":"12:30:00","end_time":"13:50:00","location":"TBA","course_id":670,"dates":["Tu","Th"]},
      {"class_name":'CSE 1104',"id":2127,"class_id":41236,"instructor":"Alexandra Stefan","section_id":"004","section_type":"LEC","meeting_time":"01/19/2016 - 05/06/2016","start_time":"09:30:00","end_time":"10:50:00","location":"TBA","course_id":670,"dates":["Tu","Th"]},
      {"class_name":'CSE 1115',"id":2128,"class_id":43187,"instructor":"Janice Carter M Tiernan","section_id":"005","section_type":"LEC","meeting_time":"01/19/2016 - 05/06/2016","start_time":"15:30:00","end_time":"16:50:00","location":"TBA","course_id":670,"dates":["Tu","Th"]}
    ];
    return {
      getSchedules: function(){
        return schedules;
      }
    }
  })
