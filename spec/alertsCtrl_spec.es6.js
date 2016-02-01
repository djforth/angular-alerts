require ('angular')
require ('angular-mocks')
require ('../src/alerts')
const _ = require('lodash')
const ctrlTests = require('@djforth/angular-jasmine-helpers').controllerTests
const mockdata  = require("./factory/alerts_data.js")

describe('AlertsCtrl', function() {
  let ctrl,
      rootScope,
      scope,
      resizeSrv,
      srv,
      fcty,
      promise,
      deferred;

  beforeEach(function(){
    // spy = jasmine.createSpy('spy');
    angular.mock.module('$alerts')
    angular.mock.inject(function($q, $rootScope, $controller, AlertsFcty, AlertsSrv) {
      scope = $rootScope.$new()
      srv   = AlertsSrv
      // Setup promise stubbing
      deferred  = $q.defer()
      promise   = deferred.promise
      spyOn(AlertsFcty, 'getData').and.returnValue(promise)
      fcty = AlertsFcty

      ctrl = $controller("AlertsCtrl", { $scope: scope })
    });
  });

  describe('setup', function() {

    it("should exist", function() {
      expect(ctrl).toBeDefined()
    });

    it("should set initial values", function() {
      let defaults = {alerts:[]}
      ctrlTests.checkValues(scope, defaults)
    });

  });

  describe('getData Functionality', function() {
    let setUp = function(){
      return {scope:scope, deferred:deferred}
    };

    let defaults = {alerts:mockdata};

    //Tests if promise success
    ctrlTests.promiseData(setUp, mockdata, defaults)

    //Tests if promise failure
    ctrlTests.promiseError(setUp, "An error occurred while fetching items, we have been notified and are investigating.  Please try again later", {error:"An error occurred while fetching items, we have been notified and are investigating.  Please try again later"} )


  });

  describe('show hide all alerts', function() {
    beforeEach(function() {
      scope.alerts = mockdata
    });

    it("should hide all alerts", function() {
      spyOn(srv, "hideAll")
      scope.hideAll()
      expect(srv.hideAll).toHaveBeenCalledWith(mockdata)
    });

    it("hould show all alerts", function() {
      spyOn(srv, "resetHidden")
      scope.showAll()
      expect(srv.resetHidden).toHaveBeenCalled()
    });
  });
});








