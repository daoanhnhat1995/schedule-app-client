angular.module('parse-starter.factories')
	.factory('ParseData',function(){

		var parse = {};

		parse.saveSchedule = function(data){
			var currentUser = Parse.User.current();
			console.log(data);

		
			
			if (currentUser) {


				// 	function getJSON(d){
				// 	var obj = {'course_title': d.course_title,
				// 			'instructor': d.instructor,
				// 			'dates': d.dates,
				// 			'location':d['location'],
				// 			'section_type':d.section_type,
				// 			'section_id':d.section_id,
				// 			'start_time':d.start_time,
				// 			'end_time':d.end_time };
				// }
				// var obj = [];
				// angular.forEach(data,function(each){
				// 	obj.push(getJSON(each));
				// });
				// obj = JSON.parse(obj);
				// console.log(obj);

				currentUser.set('schedules',JSON.stringify(data));
				currentUser.save(null, {
                    success: function(pfuser) {
                    console.log("saved Schedule");
                    },
                    error: function(pfuser, error) {
                    	console.log(error);
                    }
                  });
			    // do stuff with the user
			} else {
			    // show the signup or login page
			}
		}

		return parse;
	})