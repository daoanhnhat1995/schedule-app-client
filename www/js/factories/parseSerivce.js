angular.module('parse-starter.factories')
	.factory('ParseData',function(){

		var parse = {};

		parse.saveSchedule = function(data){
			var currentUser = Parse.User.current();

			var obj = {'course_title': data[0].course_title,
						'instructor': data[0].instructor,
						'dates': data[0].dates,
						'location':data[0]['location'],
						'section_type':data[0].section_type,
						'section_id':data[0].section_id,
						'start_time':data[0].start_time,
						'end_time':data[0].end_time };
			if (currentUser) {

				currentUser.set('schedule',obj);
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