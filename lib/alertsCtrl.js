"use strict";

var _ = require('lodash/core');

module.exports = ["$scope", "AlertsFcty", "AlertsSrv", function ($scope, AlertsFcty, AlertsSrv) {

  $scope.alerts = [];

  AlertsFcty.getData().then(function (results) {
    $scope.alerts = results;
  }, function (e) {
    $scope.error = e;
    alert(e);
  });

  $scope.showAll = function () {
    return AlertsSrv.resetHidden();
  };

  $scope.hideAll = function () {
    return AlertsSrv.hideAll($scope.alerts);
  };

  return this;
}];