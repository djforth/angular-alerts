"use strict";

var _ = require("lodash");

module.exports = ["$sce", "AlertsSrv", function ($sce, AlertsSrv) {

  return {
    restrict: "A",
    require: "^alertsHolder",
    scope: {
      alertdata: "="
    },
    templateUrl: "alert.html",

    controller: function controller($scope, $sce) {
      $scope.teaser = null;
      $scope.copy = null;
      $scope.$watch("alertdata", function (d) {
        if (!_.isUndefined(d)) {
          $scope.teaser = $sce.trustAsHtml(d.teaser);
          $scope.copy = $sce.trustAsHtml(d.copy);
        }
      });
    },

    link: function link($scope, $elem, $attrs) {
      $scope.moreLessTxt = "Read More";
      $scope.showMore = false;

      $scope.hideAlert = function () {
        AlertsSrv.isHidden($scope.alertdata);
      };

      $scope.closeAlert = function () {
        AlertsSrv.addHidden($scope.alertdata);
      };

      $scope.toggleMore = function () {
        if ($scope.showMore) {
          $scope.moreLessTxt = "Read More";
          $scope.showMore = false;
        } else {
          $scope.moreLessTxt = "Read Less";
          $scope.showMore = true;
        }
      };
    }

  };
}];