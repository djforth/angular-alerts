require 'angular'
require 'angular-mocks'
require '../../../javascripts/modules/alerts/alerts.coffee'
fctyTests   = require('factory-tests')

mockdata    = require("../../../dummy_data/alerts_data.coffee")

describe 'AlertsFcty', ->
  ctrl = rootScope = httpBackend = fcty = promise = deferred = srv =  null
  beforeEach ->
    angular.mock.module('$alerts')

  beforeEach ->

    angular.mock.inject ($q, $rootScope, $httpBackend, AlertsFcty, Venuepath)->
      httpBackend = $httpBackend;
      fcty      = AlertsFcty
      srv       = Venuepath
      deferred  = $q.defer()
      promise   = deferred.promise
      rootScope = $rootScope

      spyOn(srv, "getVenue").and.returnValue('test-venue')

  it 'should start with empty request', ->
    expect(fcty.data().length).toEqual(0)

  fctyTests.setFlushData(()->
    return fcty
  , mockdata
  )

  fctyTests.testPromises(()->
      return fcty # Passes Fcty to test - Work around
    # Data being sent
    , mockdata
    # Error msg
    , "An error occurred while fetching items, we have been notified and are investigating.  Please try again later"
    # , processData
    )

  #See support/utils/factory_test.coffee - Test HTTP Request
  fctyTests.testHTTPRequest(()->
    return fcty # Passes Fcty to test - Work around
  #URL Request
  , "/api/test-venue/alerts.json"
  # Data being sent
  , mockdata
  # Error msg
  , "An error occurred while fetching items, we have been notified and are investigating.  Please try again later"
  )