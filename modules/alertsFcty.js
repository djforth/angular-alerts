"use strict";
var _ = require("lodash");

module.exports = function ($http, $q, ALERT_URL) {
  var alertData = [];

  return {

    data: function data() {
      return alertData;
    },

    flush: function flush() {
      alertData = [];
    },

    getData: function getData(id) {
      var deferred = $q.defer();

      if (_.isEmpty(alertData)) {
        $http.get(ALERT_URL).success(function (data) {
          alertData = data;
          deferred.resolve(alertData);
        }).error(function () {
          deferred.reject("An error occurred while fetching items, we have been notified and are investigating.  Please try again later");
        });
      } else {
        deferred.resolve(alertData);
      }

      return deferred.promise;
    },

    setData: function setData(d) {
      alertData = d;
    }
  };
};