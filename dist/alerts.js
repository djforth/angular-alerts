(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./lib/alerts.es6.js":[function(require,module,exports){
"use strict";

require("angular");
require("angular-resource");

var alertsFcty = require("./alertsFcty.es6.js");
var alertsSrv = require("./alertsSrv.es6.js");
var alertsCtrl = require("./alertsCtrl.es6.js");
var alertDir = require("./alertDir.es6.js");
var alertsHolderDir = require("./alertsHolderDir.es6.js");

var alerts = angular.module("$alerts", ["ngResource"]).constant("ALERT_URL", "/api/alerts.json").run(["$templateCache", function (l) {
  l.put("alert.html", "<div class=\"alert\" ng-class=\"alertdata.severity\" ng-hide=\"hideAlert()\"><div class=\"wrap\"><div class=\"alert-summary\" ng-bind-html=\"teaser\" ng-if=\"!showMore\"></div><div class=\"alert-copy\" ng-bind-html=\"copy\" ng-if=\"showMore\"></div><div class=\"level\" title=\"Alert level {{alertdata.severity}}\"><svg viewbox=\"0 0 3840 3840\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2048 2399v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z\"></path></svg></div><a href=\"javascript:\" ng-click=\"toggleMore()\" class=\"read-more\">{{moreLessTxt}}</a> <a href=\"javascript:\" ng-click=\"closeAlert()\" class=\"close-alert\" title=\"Close alert\"><span class=\"icon\"><svg viewbox=\"0 0 3840 3840\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2301 2146q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z\"></path></svg></span></a></div></div>"), l.put("alerts-holder.html", "<div class=\"alerts-holder wrapper\" ng-show=\"alerts.length > 0\"><div class=\"row grey-panel\"><div class=\"wrap\"><ul class=\"alert-controls\"><li><a href=\"javascript:\" ng-click=\"hideAll()\"><span class=\"icon\"><svg viewbox=\"0 0 3840 3840\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2301 2146q0-26-19-45l-181-181 181-181q19-19 19-45 0-27-19-46l-90-90q-19-19-46-19-26 0-45 19l-181 181-181-181q-19-19-45-19-27 0-46 19l-90 90q-19 19-19 46 0 26 19 45l181 181-181 181q-19 19-19 45 0 27 19 46l90 90q19 19 46 19 26 0 45-19l181-181 181 181q19 19 45 19 27 0 46-19l90-90q19-19 19-46zm387-226q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z\"></path></svg></span> Close All Alerts</a></li><li><a href=\"javascript:\" ng-click=\"showAll()\"><span class=\"icon\"><svg viewbox=\"0 0 3840 3840\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M2048 2399v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z\"></path></svg></span> Show All Alerts</a></li></ul></div></div><div class=\"row\"><div alert=\"\" ng-repeat=\"alert in alerts\" alertdata=\"alert\"></div></div></div>");
}]).factory("AlertsFcty", alertsFcty).service("AlertsSrv", alertsSrv).controller("AlertsCtrl", alertsCtrl).directive("alertsHolder", alertsHolderDir).directive("alert", alertDir);

module.exports = alerts;

},{"./alertDir.es6.js":"/Users/djforth/websites/modules/alerts/lib/alertDir.es6.js","./alertsCtrl.es6.js":"/Users/djforth/websites/modules/alerts/lib/alertsCtrl.es6.js","./alertsFcty.es6.js":"/Users/djforth/websites/modules/alerts/lib/alertsFcty.es6.js","./alertsHolderDir.es6.js":"/Users/djforth/websites/modules/alerts/lib/alertsHolderDir.es6.js","./alertsSrv.es6.js":"/Users/djforth/websites/modules/alerts/lib/alertsSrv.es6.js","angular":"angular","angular-resource":"angular-resource"}],"/Users/djforth/websites/modules/alerts/lib/alertDir.es6.js":[function(require,module,exports){
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

},{"lodash":"lodash"}],"/Users/djforth/websites/modules/alerts/lib/alertsCtrl.es6.js":[function(require,module,exports){
"use strict";

var _ = require("lodash");

module.exports = ["$scope", "AlertsFcty", "AlertsSrv", function ($scope, AlertsFcty, AlertsSrv) {

  $scope.alerts = [];

  AlertsFcty.getData().then(function (results) {
    $scope.alerts = results;
  }, function (e) {
    $scope.error = e;
    alert(e);
  });

  $scope.showAll = function () {
    AlertsSrv.resetHidden();
  };

  $scope.hideAll = function () {
    AlertsSrv.hideAll($scope.alerts);
  };

  return this;
}];

},{"lodash":"lodash"}],"/Users/djforth/websites/modules/alerts/lib/alertsFcty.es6.js":[function(require,module,exports){
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

},{"lodash":"lodash"}],"/Users/djforth/websites/modules/alerts/lib/alertsHolderDir.es6.js":[function(require,module,exports){
"use strict";

"strict";

module.exports = function () {
  return {
    restrict: "A",
    templateUrl: "alerts-holder.html",
    controller: "AlertsCtrl"
  };
};

},{}],"/Users/djforth/websites/modules/alerts/lib/alertsSrv.es6.js":[function(require,module,exports){
"use strict";

var _ = require("lodash");
var Cookie = require("manage-cookies");

module.exports = function () {
  var cookie = new Cookie();

  var processCookie = function processCookie(c) {
    if (_.isUndefined(c)) {
      return [];
    }

    var list = c.split(",");
    return _.map(list, function (i) {
      return parseInt(i);
    });
  };

  var hidden = processCookie(cookie.getCookie("alerts"));

  return {
    addHidden: function addHidden(a) {
      hidden.push(a.id);
      this.cookie.createCookie("alerts", hidden, 1);
    },

    hideAll: function hideAll(alerts) {
      hidden = _.pluck(alerts, "id");
      this.cookie.createCookie("alerts", hidden, 1);
    },

    cookie: cookie,

    hiddenList: function hiddenList() {
      return hidden;
    },

    isHidden: function isHidden(a) {
      return _.contains(hidden, a.id);
    },

    loadHidden: function loadHidden() {
      hidden = this.processCookie(this.cookie.getCookie("alerts"));
    },

    processCookie: processCookie,

    resetHidden: function resetHidden() {
      hidden = [];
      this.cookie.deleteCookie("alerts");
    },

    setHidden: function setHidden(h) {
      hidden = h;
    }

  };
};

},{"lodash":"lodash","manage-cookies":"manage-cookies"}]},{},["./lib/alerts.es6.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZGpmb3J0aC93ZWJzaXRlcy9tb2R1bGVzL2FsZXJ0cy9saWIvYWxlcnRzLmVzNi5qcyIsIi9Vc2Vycy9kamZvcnRoL3dlYnNpdGVzL21vZHVsZXMvYWxlcnRzL2xpYi9hbGVydERpci5lczYuanMiLCIvVXNlcnMvZGpmb3J0aC93ZWJzaXRlcy9tb2R1bGVzL2FsZXJ0cy9saWIvYWxlcnRzQ3RybC5lczYuanMiLCIvVXNlcnMvZGpmb3J0aC93ZWJzaXRlcy9tb2R1bGVzL2FsZXJ0cy9saWIvYWxlcnRzRmN0eS5lczYuanMiLCIvVXNlcnMvZGpmb3J0aC93ZWJzaXRlcy9tb2R1bGVzL2FsZXJ0cy9saWIvYWxlcnRzSG9sZGVyRGlyLmVzNi5qcyIsIi9Vc2Vycy9kamZvcnRoL3dlYnNpdGVzL21vZHVsZXMvYWxlcnRzL2xpYi9hbGVydHNTcnYuZXM2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFBOztBQUVaLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQixPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFNUIsSUFBSSxVQUFVLEdBQVEsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUE7QUFDcEQsSUFBSSxTQUFTLEdBQVMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUE7QUFDbkQsSUFBSSxVQUFVLEdBQU8sT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUE7QUFDbkQsSUFBSSxRQUFRLEdBQVUsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUE7QUFDbEQsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUE7O0FBRXpELElBQUksTUFBTSxHQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FDcEQsUUFBUSxDQUFD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QUE7S0FDWDs7R0FLRixDQUFBO0NBRUYsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcblxucmVxdWlyZSgnYW5ndWxhcicpO1xucmVxdWlyZSgnYW5ndWxhci1yZXNvdXJjZScpO1xuXG5sZXQgYWxlcnRzRmN0eSAgICAgID0gcmVxdWlyZSgnLi9hbGVydHNGY3R5LmVzNi5qcycpXG5sZXQgYWxlcnRzU3J2ICAgICAgID0gcmVxdWlyZSgnLi9hbGVydHNTcnYuZXM2LmpzJylcbmxldCBhbGVydHNDdHJsICAgICA9IHJlcXVpcmUoJy4vYWxlcnRzQ3RybC5lczYuanMnKVxubGV0IGFsZXJ0RGlyICAgICAgICA9IHJlcXVpcmUoJy4vYWxlcnREaXIuZXM2LmpzJylcbmxldCBhbGVydHNIb2xkZXJEaXIgPSByZXF1aXJlKCcuL2FsZXJ0c0hvbGRlckRpci5lczYuanMnKVxuXG52YXIgYWxlcnRzID0gIGFuZ3VsYXIubW9kdWxlKCckYWxlcnRzJywgWyduZ1Jlc291cmNlJ10pXG4gIC5jb25zdGFudCgnQUxFUlRfVVJMJywnL2FwaS9hbGVydHMuanNvbicpXG4gIC5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihsKXtsLnB1dChcImFsZXJ0Lmh0bWxcIiwnPGRpdiBjbGFzcz1cImFsZXJ0XCIgbmctY2xhc3M9XCJhbGVydGRhdGEuc2V2ZXJpdHlcIiBuZy1oaWRlPVwiaGlkZUFsZXJ0KClcIj48ZGl2IGNsYXNzPVwid3JhcFwiPjxkaXYgY2xhc3M9XCJhbGVydC1zdW1tYXJ5XCIgbmctYmluZC1odG1sPVwidGVhc2VyXCIgbmctaWY9XCIhc2hvd01vcmVcIj48L2Rpdj48ZGl2IGNsYXNzPVwiYWxlcnQtY29weVwiIG5nLWJpbmQtaHRtbD1cImNvcHlcIiBuZy1pZj1cInNob3dNb3JlXCI+PC9kaXY+PGRpdiBjbGFzcz1cImxldmVsXCIgdGl0bGU9XCJBbGVydCBsZXZlbCB7e2FsZXJ0ZGF0YS5zZXZlcml0eX19XCI+PHN2ZyB2aWV3Ym94PVwiMCAwIDM4NDAgMzg0MFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTIwNDggMjM5OXYtMTkwcTAtMTQtOS41LTIzLjV0LTIyLjUtOS41aC0xOTJxLTEzIDAtMjIuNSA5LjV0LTkuNSAyMy41djE5MHEwIDE0IDkuNSAyMy41dDIyLjUgOS41aDE5MnExMyAwIDIyLjUtOS41dDkuNS0yMy41em0tMi0zNzRsMTgtNDU5cTAtMTItMTAtMTktMTMtMTEtMjQtMTFoLTIyMHEtMTEgMC0yNCAxMS0xMCA3LTEwIDIxbDE3IDQ1N3EwIDEwIDEwIDE2LjV0MjQgNi41aDE4NXExNCAwIDIzLjUtNi41dDEwLjUtMTYuNXptLTE0LTkzNGw3NjggMTQwOHEzNSA2My0yIDEyNi0xNyAyOS00Ni41IDQ2dC02My41IDE3aC0xNTM2cS0zNCAwLTYzLjUtMTd0LTQ2LjUtNDZxLTM3LTYzLTItMTI2bDc2OC0xNDA4cTE3LTMxIDQ3LTQ5dDY1LTE4IDY1IDE4IDQ3IDQ5elwiPjwvcGF0aD48L3N2Zz48L2Rpdj48YSBocmVmPVwiamF2YXNjcmlwdDpcIiBuZy1jbGljaz1cInRvZ2dsZU1vcmUoKVwiIGNsYXNzPVwicmVhZC1tb3JlXCI+e3ttb3JlTGVzc1R4dH19PC9hPiA8YSBocmVmPVwiamF2YXNjcmlwdDpcIiBuZy1jbGljaz1cImNsb3NlQWxlcnQoKVwiIGNsYXNzPVwiY2xvc2UtYWxlcnRcIiB0aXRsZT1cIkNsb3NlIGFsZXJ0XCI+PHNwYW4gY2xhc3M9XCJpY29uXCI+PHN2ZyB2aWV3Ym94PVwiMCAwIDM4NDAgMzg0MFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTIzMDEgMjE0NnEwLTI2LTE5LTQ1bC0xODEtMTgxIDE4MS0xODFxMTktMTkgMTktNDUgMC0yNy0xOS00NmwtOTAtOTBxLTE5LTE5LTQ2LTE5LTI2IDAtNDUgMTlsLTE4MSAxODEtMTgxLTE4MXEtMTktMTktNDUtMTktMjcgMC00NiAxOWwtOTAgOTBxLTE5IDE5LTE5IDQ2IDAgMjYgMTkgNDVsMTgxIDE4MS0xODEgMTgxcS0xOSAxOS0xOSA0NSAwIDI3IDE5IDQ2bDkwIDkwcTE5IDE5IDQ2IDE5IDI2IDAgNDUtMTlsMTgxLTE4MSAxODEgMTgxcTE5IDE5IDQ1IDE5IDI3IDAgNDYtMTlsOTAtOTBxMTktMTkgMTktNDZ6bTM4Ny0yMjZxMCAyMDktMTAzIDM4NS41dC0yNzkuNSAyNzkuNS0zODUuNSAxMDMtMzg1LjUtMTAzLTI3OS41LTI3OS41LTEwMy0zODUuNSAxMDMtMzg1LjUgMjc5LjUtMjc5LjUgMzg1LjUtMTAzIDM4NS41IDEwMyAyNzkuNSAyNzkuNSAxMDMgMzg1LjV6XCI+PC9wYXRoPjwvc3ZnPjwvc3Bhbj48L2E+PC9kaXY+PC9kaXY+JyksbC5wdXQoXCJhbGVydHMtaG9sZGVyLmh0bWxcIiwnPGRpdiBjbGFzcz1cImFsZXJ0cy1ob2xkZXIgd3JhcHBlclwiIG5nLXNob3c9XCJhbGVydHMubGVuZ3RoID4gMFwiPjxkaXYgY2xhc3M9XCJyb3cgZ3JleS1wYW5lbFwiPjxkaXYgY2xhc3M9XCJ3cmFwXCI+PHVsIGNsYXNzPVwiYWxlcnQtY29udHJvbHNcIj48bGk+PGEgaHJlZj1cImphdmFzY3JpcHQ6XCIgbmctY2xpY2s9XCJoaWRlQWxsKClcIj48c3BhbiBjbGFzcz1cImljb25cIj48c3ZnIHZpZXdib3g9XCIwIDAgMzg0MCAzODQwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPjxwYXRoIGQ9XCJNMjMwMSAyMTQ2cTAtMjYtMTktNDVsLTE4MS0xODEgMTgxLTE4MXExOS0xOSAxOS00NSAwLTI3LTE5LTQ2bC05MC05MHEtMTktMTktNDYtMTktMjYgMC00NSAxOWwtMTgxIDE4MS0xODEtMTgxcS0xOS0xOS00NS0xOS0yNyAwLTQ2IDE5bC05MCA5MHEtMTkgMTktMTkgNDYgMCAyNiAxOSA0NWwxODEgMTgxLTE4MSAxODFxLTE5IDE5LTE5IDQ1IDAgMjcgMTkgNDZsOTAgOTBxMTkgMTkgNDYgMTkgMjYgMCA0NS0xOWwxODEtMTgxIDE4MSAxODFxMTkgMTkgNDUgMTkgMjcgMCA0Ni0xOWw5MC05MHExOS0xOSAxOS00NnptMzg3LTIyNnEwIDIwOS0xMDMgMzg1LjV0LTI3OS41IDI3OS41LTM4NS41IDEwMy0zODUuNS0xMDMtMjc5LjUtMjc5LjUtMTAzLTM4NS41IDEwMy0zODUuNSAyNzkuNS0yNzkuNSAzODUuNS0xMDMgMzg1LjUgMTAzIDI3OS41IDI3OS41IDEwMyAzODUuNXpcIj48L3BhdGg+PC9zdmc+PC9zcGFuPiBDbG9zZSBBbGwgQWxlcnRzPC9hPjwvbGk+PGxpPjxhIGhyZWY9XCJqYXZhc2NyaXB0OlwiIG5nLWNsaWNrPVwic2hvd0FsbCgpXCI+PHNwYW4gY2xhc3M9XCJpY29uXCI+PHN2ZyB2aWV3Ym94PVwiMCAwIDM4NDAgMzg0MFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTTIwNDggMjM5OXYtMTkwcTAtMTQtOS41LTIzLjV0LTIyLjUtOS41aC0xOTJxLTEzIDAtMjIuNSA5LjV0LTkuNSAyMy41djE5MHEwIDE0IDkuNSAyMy41dDIyLjUgOS41aDE5MnExMyAwIDIyLjUtOS41dDkuNS0yMy41em0tMi0zNzRsMTgtNDU5cTAtMTItMTAtMTktMTMtMTEtMjQtMTFoLTIyMHEtMTEgMC0yNCAxMS0xMCA3LTEwIDIxbDE3IDQ1N3EwIDEwIDEwIDE2LjV0MjQgNi41aDE4NXExNCAwIDIzLjUtNi41dDEwLjUtMTYuNXptLTE0LTkzNGw3NjggMTQwOHEzNSA2My0yIDEyNi0xNyAyOS00Ni41IDQ2dC02My41IDE3aC0xNTM2cS0zNCAwLTYzLjUtMTd0LTQ2LjUtNDZxLTM3LTYzLTItMTI2bDc2OC0xNDA4cTE3LTMxIDQ3LTQ5dDY1LTE4IDY1IDE4IDQ3IDQ5elwiPjwvcGF0aD48L3N2Zz48L3NwYW4+IFNob3cgQWxsIEFsZXJ0czwvYT48L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgYWxlcnQ9XCJcIiBuZy1yZXBlYXQ9XCJhbGVydCBpbiBhbGVydHNcIiBhbGVydGRhdGE9XCJhbGVydFwiPjwvZGl2PjwvZGl2PjwvZGl2PicpfV0pXG4gIC5mYWN0b3J5KCdBbGVydHNGY3R5JywgYWxlcnRzRmN0eSlcbiAgLnNlcnZpY2UoJ0FsZXJ0c1NydicsIGFsZXJ0c1NydilcbiAgLmNvbnRyb2xsZXIoJ0FsZXJ0c0N0cmwnLCBhbGVydHNDdHJsKVxuICAuZGlyZWN0aXZlKCdhbGVydHNIb2xkZXInLCBhbGVydHNIb2xkZXJEaXIpXG4gIC5kaXJlY3RpdmUoJ2FsZXJ0JywgYWxlcnREaXIpXG5cbm1vZHVsZS5leHBvcnRzID0gYWxlcnRzOyIsIlxuY29uc3QgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpXG5cbm1vZHVsZS5leHBvcnRzID0gW1wiJHNjZVwiLCBcIkFsZXJ0c1NydlwiLCBmdW5jdGlvbiAoJHNjZSwgQWxlcnRzU3J2KXtcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgcmVxdWlyZTogJ15hbGVydHNIb2xkZXInLFxuICAgIHNjb3BlOntcbiAgICAgIGFsZXJ0ZGF0YTpcIj1cIlxuICAgIH0sXG4gICAgdGVtcGxhdGVVcmw6ICdhbGVydC5odG1sJyxcblxuICAgIGNvbnRyb2xsZXI6ZnVuY3Rpb24oJHNjb3BlLCAkc2NlKXtcbiAgICAgICRzY29wZS50ZWFzZXIgPSBudWxsO1xuICAgICAgJHNjb3BlLmNvcHkgICA9IG51bGw7XG4gICAgICAkc2NvcGUuJHdhdGNoKCdhbGVydGRhdGEnLCBmdW5jdGlvbihkKXtcbiAgICAgICAgaWYoIV8uaXNVbmRlZmluZWQoZCkpe1xuICAgICAgICAgICRzY29wZS50ZWFzZXIgPSAkc2NlLnRydXN0QXNIdG1sKGQudGVhc2VyKTtcbiAgICAgICAgICAkc2NvcGUuY29weSAgID0gJHNjZS50cnVzdEFzSHRtbChkLmNvcHkpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG5cbiAgICBsaW5rOmZ1bmN0aW9uKCRzY29wZSwgJGVsZW0sICRhdHRycyl7XG4gICAgICAkc2NvcGUubW9yZUxlc3NUeHQgPSBcIlJlYWQgTW9yZVwiO1xuICAgICAgJHNjb3BlLnNob3dNb3JlICAgID0gZmFsc2U7XG5cbiAgICAgICRzY29wZS5oaWRlQWxlcnQgPSBmdW5jdGlvbigpe1xuICAgICAgICBBbGVydHNTcnYuaXNIaWRkZW4oJHNjb3BlLmFsZXJ0ZGF0YSk7XG4gICAgICB9XG5cbiAgICAgICRzY29wZS5jbG9zZUFsZXJ0PWZ1bmN0aW9uKCl7XG4gICAgICAgIEFsZXJ0c1Nydi5hZGRIaWRkZW4oJHNjb3BlLmFsZXJ0ZGF0YSk7XG4gICAgICB9XG5cblxuICAgICAgJHNjb3BlLnRvZ2dsZU1vcmU9ZnVuY3Rpb24oKXtcbiAgICAgICAgaWYoJHNjb3BlLnNob3dNb3JlKXtcbiAgICAgICAgICAkc2NvcGUubW9yZUxlc3NUeHQgPSBcIlJlYWQgTW9yZVwiO1xuICAgICAgICAgICRzY29wZS5zaG93TW9yZSAgICA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRzY29wZS5tb3JlTGVzc1R4dCA9IFwiUmVhZCBMZXNzXCI7XG4gICAgICAgICAgJHNjb3BlLnNob3dNb3JlICAgID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfVxuXG4gIH1cbn1dIiwibGV0IF8gPSByZXF1aXJlKCdsb2Rhc2gnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFtcIiRzY29wZVwiLCBcIkFsZXJ0c0ZjdHlcIiwgXCJBbGVydHNTcnZcIiwgZnVuY3Rpb24oJHNjb3BlLCBBbGVydHNGY3R5LCBBbGVydHNTcnYpe1xuXG4gICRzY29wZS5hbGVydHMgPSBbXVxuXG4gIEFsZXJ0c0ZjdHkuZ2V0RGF0YSgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0cyl7XG4gICAgJHNjb3BlLmFsZXJ0cyA9IHJlc3VsdHNcbiAgICB9LCBmdW5jdGlvbihlKXtcbiAgICAgICRzY29wZS5lcnJvciA9IGU7XG4gICAgICBhbGVydChlKTtcbiAgfSk7XG5cbiAgJHNjb3BlLnNob3dBbGwgPSBmdW5jdGlvbigpe1xuICAgIEFsZXJ0c1Nydi5yZXNldEhpZGRlbigpO1xuICB9XG5cbiAgJHNjb3BlLmhpZGVBbGwgPSBmdW5jdGlvbigpe1xuICAgIEFsZXJ0c1Nydi5oaWRlQWxsKCRzY29wZS5hbGVydHMpXG4gIH1cblxuICByZXR1cm4gdGhpc1xuXG59XTsiLCIndXNlIHN0cmljdCdcbmxldCBfID0gcmVxdWlyZSgnbG9kYXNoJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkaHR0cCwgJHEsIEFMRVJUX1VSTCl7XG4gIGxldCBhbGVydERhdGEgPSBbXVxuXG4gIHJldHVybiB7XG5cbiAgICBkYXRhOmZ1bmN0aW9uKCl7XG4gICAgICByZXR1cm4gYWxlcnREYXRhO1xuICAgIH0sXG5cbiAgICBmbHVzaDpmdW5jdGlvbigpe1xuICAgICAgYWxlcnREYXRhID0gW107XG4gICAgfSxcblxuICAgIGdldERhdGE6ZnVuY3Rpb24oaWQpe1xuICAgICAgbGV0IGRlZmVycmVkID0gJHEuZGVmZXIoKVxuXG4gICAgICBpZiAoXy5pc0VtcHR5KGFsZXJ0RGF0YSkpe1xuICAgICAgICAkaHR0cC5nZXQoQUxFUlRfVVJMKVxuICAgICAgICAuc3VjY2VzcyhmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgICBhbGVydERhdGEgPSBkYXRhXG4gICAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShhbGVydERhdGEpXG4gICAgICAgIH0pXG4gICAgICAgIC5lcnJvcihmdW5jdGlvbigpe1xuICAgICAgICAgIGRlZmVycmVkLnJlamVjdChcIkFuIGVycm9yIG9jY3VycmVkIHdoaWxlIGZldGNoaW5nIGl0ZW1zLCB3ZSBoYXZlIGJlZW4gbm90aWZpZWQgYW5kIGFyZSBpbnZlc3RpZ2F0aW5nLiAgUGxlYXNlIHRyeSBhZ2FpbiBsYXRlclwiKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVmZXJyZWQucmVzb2x2ZShhbGVydERhdGEpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWZlcnJlZC5wcm9taXNlO1xuICAgIH0sXG5cbiAgICBzZXREYXRhOmZ1bmN0aW9uKGQpe1xuICAgICAgYWxlcnREYXRhID0gZFxuICAgIH1cbiAgfVxufVxuIiwiJ3N0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSAgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHRlbXBsYXRlVXJsOiAnYWxlcnRzLWhvbGRlci5odG1sJyxcbiAgICBjb250cm9sbGVyOlwiQWxlcnRzQ3RybFwiXG4gICAgfVxufVxuXG5cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBfICAgICAgPSByZXF1aXJlKCdsb2Rhc2gnKVxuY29uc3QgQ29va2llID0gcmVxdWlyZSgnbWFuYWdlLWNvb2tpZXMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7XG4gIGxldCBjb29raWUgPSBuZXcgQ29va2llKCk7XG5cbiAgY29uc3QgcHJvY2Vzc0Nvb2tpZSA9IGZ1bmN0aW9uIChjKXtcbiAgICBpZihfLmlzVW5kZWZpbmVkKGMpKXtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICBsZXQgbGlzdCA9IGMuc3BsaXQoJywnKTtcbiAgICByZXR1cm4gXy5tYXAobGlzdCwgaSA9PntcbiAgICAgIHJldHVybiBwYXJzZUludChpKTtcbiAgICB9KTtcbiAgfTtcblxuICBsZXQgaGlkZGVuID0gcHJvY2Vzc0Nvb2tpZShjb29raWUuZ2V0Q29va2llKFwiYWxlcnRzXCIpKVxuXG4gIHJldHVybiB7XG4gICAgYWRkSGlkZGVuOiBmdW5jdGlvbihhKXtcbiAgICAgIGhpZGRlbi5wdXNoKGEuaWQpO1xuICAgICAgdGhpcy5jb29raWUuY3JlYXRlQ29va2llKFwiYWxlcnRzXCIsIGhpZGRlbiwgMSk7XG4gICAgfSxcblxuICAgIGhpZGVBbGw6ZnVuY3Rpb24oYWxlcnRzKXtcbiAgICAgIGhpZGRlbiA9IF8ucGx1Y2soYWxlcnRzLCBcImlkXCIpXG4gICAgICB0aGlzLmNvb2tpZS5jcmVhdGVDb29raWUoXCJhbGVydHNcIiwgaGlkZGVuLCAxKVxuICAgIH0sXG5cbiAgICBjb29raWU6Y29va2llLFxuXG4gICAgaGlkZGVuTGlzdDpmdW5jdGlvbigpe1xuICAgICAgIHJldHVybiBoaWRkZW47XG4gICAgfSxcblxuICAgIGlzSGlkZGVuOmZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIF8uY29udGFpbnMoaGlkZGVuLCBhLmlkKTtcbiAgICB9LFxuXG4gICAgbG9hZEhpZGRlbjpmdW5jdGlvbigpe1xuICAgICAgaGlkZGVuID0gdGhpcy5wcm9jZXNzQ29va2llKHRoaXMuY29va2llLmdldENvb2tpZShcImFsZXJ0c1wiKSlcbiAgICB9LFxuXG4gICAgcHJvY2Vzc0Nvb2tpZTpwcm9jZXNzQ29va2llLFxuXG4gICAgcmVzZXRIaWRkZW46ZnVuY3Rpb24oKXtcbiAgICAgIGhpZGRlbiA9IFtdXG4gICAgICB0aGlzLmNvb2tpZS5kZWxldGVDb29raWUoXCJhbGVydHNcIilcbiAgICB9LFxuXG4gICAgc2V0SGlkZGVuOmZ1bmN0aW9uKGgpe1xuICAgICAgaGlkZGVuID0gaFxuICAgIH1cblxuXG5cblxuICB9XG5cbn1cbiJdfQ==
