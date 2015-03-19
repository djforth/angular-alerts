
require ('angular')
require ('angular-mocks')

require ('../lib/alerts.es6.js')
let _ = require('lodash')

let mockdata = require("./factory/alerts_data.js")

describe('Alert Service', function(){
  let srv;

  beforeEach(function(){
    // spy = jasmine.createSpy('spy');
    angular.mock.module('$alerts')
    angular.mock.inject(function(AlertsSrv){
      srv = AlertsSrv
    })
  })

  it("should exist", function() {
    expect(srv).toBeDefined()
  });

  describe('loadHidden', function() {
    it("should load alerts cookie data", function() {
      spyOn(srv.cookie, "getCookie").and.returnValue("1,2,3")
      srv.loadHidden()
      expect(srv.hiddenList()).toEqual([1,2,3])
      expect(srv.cookie.getCookie).toHaveBeenCalledWith("alerts")
    });

    it("should sets empty array if no alert", function() {
      spyOn(srv.cookie, "getCookie").and.returnValue(undefined)
      srv.loadHidden()
      expect(srv.hiddenList()).toEqual([])
      expect(srv.cookie.getCookie).toHaveBeenCalledWith("alerts")
    });
  });

  describe('add, hideAll and reset functions', function() {
    beforeEach(function() {
      spyOn(srv.cookie, "createCookie")
      spyOn(srv.cookie, "deleteCookie")
    });

    it("should add alert id to hidden & create cookie", function() {
      srv.addHidden(mockdata[0])
      expect(srv.hiddenList()).toEqual([2955])
      expect(srv.cookie.createCookie).toHaveBeenCalledWith("alerts", [2955], 1)
    });

    it("should delete alert", function() {
      srv.resetHidden()
      expect(srv.hiddenList()).toEqual([])
      expect(srv.cookie.deleteCookie).toHaveBeenCalledWith("alerts")
    });

    it("should add alert id to hidden & create cookie", function() {
      srv.hideAll(mockdata)
      expect(srv.hiddenList()).toEqual([2955,2956,2957])
      expect(srv.cookie.createCookie).toHaveBeenCalledWith("alerts", [2955,2956,2957], 1)
    });
  });

  describe('isHidden functions', function() {
    beforeEach(function() {
      srv.setHidden([2955])
    });

    it("should return true if alert is in hidden array", function() {
      expect(srv.isHidden(mockdata[0])).toBeTruthy()
    });

    it('should return false if alert is not in hidden array', function() {
      expect(srv.isHidden(mockdata[1])).toBeFalsy()
    });
  });

  describe('processCookie', function() {
    it("should return empty array if no data", function() {
      let data = srv.processCookie()
      expect(data).toEqual([])
    });

    it("should return an array if only 1 item", function() {
      let data = srv.processCookie("1")
      expect(data).toEqual([1])
    });

    it("should return an array if only 3 item", function() {
       let data = srv.processCookie("1,2,3")
       expect(data).toEqual([1,2,3])
    });
  });
});












