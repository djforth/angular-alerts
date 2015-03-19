require ('angular')
require ('angular-mocks')
require ('../lib/alerts.es6.js')
var fctyTests   = require('factory-tests')

var mockdata    = require("./factory/alerts_data.js")

describe('AlertsFcty', function(){
  let ctrl, rootScope, httpBackend, fcty, promise, deferred, srv;

  beforeEach(function(){
    angular.mock.module('$alerts');
  })

  beforeEach(function(){
    angular.mock.inject(function($q, $rootScope, $httpBackend, AlertsFcty){
      httpBackend = $httpBackend;
      fcty      = AlertsFcty
      deferred  = $q.defer()
      promise   = deferred.promise
      rootScope = $rootScope
    });
  })

  it('should start with empty request', function() {
    expect(fcty.data().length).toEqual(0)
  });

  fctyTests.setFlushData(function(){
    return fcty
  }, mockdata);

  fctyTests.testPromises(function(){
    return fcty; //Passes Fcty to test - Work around
  }
  // Data being sent
  , mockdata
  // Error msg
  , "An error occurred while fetching items, we have been notified and are investigating.  Please try again later"
  );


  // Test HTTP Request
  fctyTests.testHTTPRequest(function(){
    return fcty; // Passes Fcty to test - Work around
  }
  // URL Request
  , "/api/alerts.json"
  // Data being sent
  , mockdata
  // Error msg
  , "An error occurred while fetching items, we have been notified and are investigating.  Please try again later"
  );


});

