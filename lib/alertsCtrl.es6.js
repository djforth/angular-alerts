let _ = require('lodash')

module.exports = ["$scope", "AlertsFcty", "AlertsSrv", function($scope, AlertsFcty, AlertsSrv){

  $scope.alerts = []

  AlertsFcty.getData().then(function(results){
    $scope.alerts = results
    }, function(e){
      $scope.error = e;
      alert(e);
  });

  $scope.showAll = function(){
    AlertsSrv.resetHidden();
  }

  $scope.hideAll = function(){
    AlertsSrv.hideAll($scope.alerts)
  }

  return this

}];