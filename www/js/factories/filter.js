angular.module('parse-starter.factories')
  .factory('Filter',function($q,$timeout){
    var search = function(searchFilter,target) {

      console.log('Searching for ' + searchFilter);

      var deferred = $q.defer();

      var matches = target.filter( function(obj) {
          if(obj.name.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1 )
           return true;
      });

      $timeout( function()
      {
        deferred.resolve( matches );
      }, 50);

      return deferred.promise;

    };

    return {search: search}
  })
