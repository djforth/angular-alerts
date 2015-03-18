
_ = require('lodash')

module.exports = ["$sce", "AlertsSrv", ($sce, AlertsSrv)->

  return {
    restrict: 'A',
    require: '^alertsHolder',
    scope:{
      alertdata:"="
    }
    controller:($scope, $sce)->
      $scope.teaser = null
      $scope.copy   = null
      $scope.$watch 'alertdata', (d)->
        unless _.isUndefined(d)
          $scope.teaser = $sce.trustAsHtml(d.teaser)
          $scope.copy   = $sce.trustAsHtml(d.copy)

    # transclude: true,
    templateUrl: 'alerts/alert.html',
    link:($scope, $elem, $attrs)->
      $scope.moreLessTxt = "Read More"
      $scope.showMore    = false

      $scope.hideAlert = ()->
        AlertsSrv.isHidden($scope.alertdata)

      $scope.closeAlert=()->
        AlertsSrv.addHidden($scope.alertdata)


      $scope.toggleMore=()->
        if $scope.showMore
          $scope.moreLessTxt = "Read More"
          $scope.showMore    = false
        else
          $scope.moreLessTxt = "Read Less"
          $scope.showMore    = true
    }
]