_ = require('lodash')

module.exports = ["$scope", "AlertsFcty", "AlertsSrv", ($scope, AlertsFcty, AlertsSrv)->
  $scope.alerts = []
  # $scope.hidden = []

  AlertsFcty.getData().then (results)->
    $scope.alerts = results

  , (e)->
    $scope.error = e
    alert(e)

  $scope.showAll = ()->
    AlertsSrv.resetHidden()

  $scope.hideAll = ()->
    AlertsSrv.hideAll($scope.alerts)


  return @
]