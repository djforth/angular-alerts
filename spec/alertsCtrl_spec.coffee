require 'angular'
require 'angular-mocks'
require '../../../javascripts/modules/alerts/alerts.coffee'
ctrlTests   = require('controller-tests')

mockdata    = require("../../../dummy_data/alerts_data.coffee")

describe 'AlertsFcty', ->
  ctrl = rootScope = scope = resizeSrv = null
  srv = fcty = promise = deferred = null
  beforeEach ->
    angular.mock.module('$alerts')

  beforeEach ->

    angular.mock.inject ($q, $rootScope, $controller, AlertsFcty, AlertsSrv)->
      scope = $rootScope.$new()
      srv   = AlertsSrv
      #Setup promise stubbing
      deferred  = $q.defer()
      promise   = deferred.promise
      spyOn(AlertsFcty, 'getData').and.returnValue(promise)
      fcty = AlertsFcty

      ctrl = $controller("AlertsCtrl", { $scope: scope })

  describe 'setup', ->
    it 'should exsist', ->
      expect(ctrl).toBeDefined()

    it "should set initial values", ->
      defaults = {alerts:[]}

      ctrlTests.checkValues(scope, defaults)

  describe "getData Functionality", ->

    setUp = ()->
      {scope:scope, deferred:deferred}

    defaults = {alerts:mockdata}

    # Tests if promise success
    ctrlTests.promiseData(setUp, mockdata, defaults)

    #Tests if promise failure
    ctrlTests.promiseError(setUp, "An error occurred while fetching items, we have been notified and are investigating.  Please try again later", {error:"An error occurred while fetching items, we have been notified and are investigating.  Please try again later"} )

  describe 'show hide all alerts', ->
    beforeEach ->
      scope.alerts = mockdata

    it 'should hide all alerts ', ->
      spyOn(srv, "hideAll")
      scope.hideAll()
      expect(srv.hideAll).toHaveBeenCalledWith(mockdata)

    it 'should show all alerts ', ->
      spyOn(srv, "resetHidden")
      scope.showAll()
      expect(srv.resetHidden).toHaveBeenCalled()







