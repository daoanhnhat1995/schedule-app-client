angular.module('parse-starter.factories')
  .factory('Schedule',function(){
    var schedule = {};
    var listClass = [];
    return {
      addClass: function(dept,classname){
        listClass.push({
          department: dept,
          class: classname
        });
      },
      getListClass: function(){
        return listClass;
      },
      removeClass: function(classname){
        listClass.splice(listClass.indexOf(classname),1);
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
        'name': 'MUSI'

      },
      {
        'id': 2,
        'name': 'CE'
      }
    ];
    var searchDepartment = function(searchFilter) {

    console.log('Searching for ' + searchFilter);

    var deferred = $q.defer();

    var matches = departments.filter( function(dep) {
    if(dep.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 ) return true;
    })

    $timeout( function(){

       deferred.resolve( matches );

    }, 50);

    return deferred.promise;

    };

    return {
      getDepartments : function(){
        return departments;
      },
      searchDepartment: searchDepartment
    }
  });
