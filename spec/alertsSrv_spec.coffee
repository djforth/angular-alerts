require 'angular'
require 'angular-mocks'

# # Flush cookies for test
# Cookie = require('manage-cookies')
# cookie = new Cookie()
# cookie.deleteCookie("alerts")

require '../../../javascripts/modules/alerts/alerts.coffee'
_ = require 'lodash'

mockdata    = require("../../../dummy_data/alerts_data.coffee")

describe 'Alert Service', ->
  srv = null

  beforeEach ->
    spy = jasmine.createSpy('spy');
    angular.mock.module('$alerts')
    angular.mock.inject((AlertsSrv)->
      srv = AlertsSrv
    )

  it 'should exist', ->
    expect(srv).toBeDefined()

  describe 'loadHidden', ->

    it 'should load alerts cookie data', ->
      spyOn(srv.cookie, "getCookie").and.returnValue("1,2,3")
      srv.loadHidden()
      expect(srv.hiddenList()).toEqual([1,2,3])
      expect(srv.cookie.getCookie).toHaveBeenCalledWith("alerts")

    it 'should sets empty array if no alert', ->
      spyOn(srv.cookie, "getCookie").and.returnValue(undefined)
      srv.loadHidden()
      expect(srv.hiddenList()).toEqual([])
      expect(srv.cookie.getCookie).toHaveBeenCalledWith("alerts")

  describe 'add, hideAll and reset functions', ->

    beforeEach ->
      spyOn(srv.cookie, "createCookie")
      spyOn(srv.cookie, "deleteCookie")

    it 'should add alert id to hidden & create cookie', ->
      srv.addHidden(mockdata[0])
      expect(srv.hiddenList()).toEqual([2955])
      expect(srv.cookie.createCookie).toHaveBeenCalledWith("alerts", [2955], 1)

    it 'should delete alert', ->
      srv.resetHidden()
      expect(srv.hiddenList()).toEqual([])
      expect(srv.cookie.deleteCookie).toHaveBeenCalledWith("alerts")

    it 'should add alert id to hidden & create cookie', ->
      srv.hideAll(mockdata)
      expect(srv.hiddenList()).toEqual([2955,2956,2957])
      expect(srv.cookie.createCookie).toHaveBeenCalledWith("alerts", [2955,2956,2957], 1)

  describe 'isHidden functions', ->

    beforeEach ->
      srv.setHidden([2955])

    it 'should return true if alert is in hidden array', ->
      expect(srv.isHidden(mockdata[0])).toBeTruthy()

    it 'should return false if alert is not in hidden array', ->
      expect(srv.isHidden(mockdata[1])).toBeFalsy()

  describe 'processCookie', ->

    it 'should return empty array if no data', ->
      data = srv.processCookie()
      expect(data).toEqual([])

     it 'should return an array if only 1 item', ->
      data = srv.processCookie("1")
      expect(data).toEqual([1])

    it 'should return an array if only 3 item', ->
      data = srv.processCookie("1,2,3")
      expect(data).toEqual([1,2,3])












