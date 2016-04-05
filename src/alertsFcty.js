'use strict'
let _ = require('lodash/core');

module.exports = function($http, $q, ALERT_URL){
  let alertData = []

  return {

    data:function(){
      return alertData;
    },

    flush:function(){
      alertData = [];
    },

    getData:function(id){
      let deferred = $q.defer()

      if (_.isEmpty(alertData)){
        $http.get(ALERT_URL)
        .success(function(data){
          alertData = data
          deferred.resolve(alertData)
        })
        .error(function(){
          deferred.reject("An error occurred while fetching items, we have been notified and are investigating.  Please try again later")
        })
      } else {
        deferred.resolve(alertData)
      }

      return deferred.promise;
    },

    setData:function(d){
      alertData = d
    }
  }
}
