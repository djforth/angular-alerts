require 'angular'
require 'angular-mocks'

require '../../../javascripts/modules/alerts/alerts.coffee'
_ = require 'lodash'

mockdata    = require("../../../dummy_data/alerts_data.coffee")

directives = require('../../../support/utils/directives_tests.coffee')


describe 'Alert Directive', ->
  element = scope = isoScope = fcty = promise = deferred = null
  spySet = spyHiddden = srv = null
  beforeEach ->
    spy = jasmine.createSpy('spy');
    angular.mock.module('$alerts')
    angular.mock.inject(($q, $sce, $rootScope, $controller, AlertsFcty, AlertsSrv)->
        scope = $rootScope.$new()
        #Setup promise stubbing
        deferred  = $q.defer()
        promise   = deferred.promise
        spyOn(AlertsFcty, 'getData').and.returnValue(promise)
        fcty = AlertsFcty
        srv  = AlertsSrv

        # spySet = jasmine.createSpy('setHidden')
        # spyHiddden = jasmine.createSpy('isHidden')
        AlertsCtrlMock = jasmine.createSpy('AlertsCtrl')

        scope.alert = mockdata[0]
        scope.$apply()

        element = directives.createNestedDirectiveHTML(
          '<div fake-dir><div alert alertdata="alert"></div><div>',
          scope,
          {title:'$alertsHolderController', mock:AlertsCtrlMock}
        )

        isoScope = element.isolateScope();
      )

  afterEach ->
    angular.element(element).remove();

  it 'should exist', ->
    # console.log "Alert", element
    expect(element).toBeDefined()

  it 'defaults', ->
    expect(isoScope.moreLessTxt).toEqual("Read More")
    expect(isoScope.showMore).toBeFalsy()

  describe 'link functions', ->
    beforeEach ->
      spyOn(srv, "addHidden")
      spyOn(srv, "isHidden")

    it 'should call isHidden', ->
      srv.isHidden.calls.reset()
      expect(srv.isHidden).not.toHaveBeenCalled()
      isoScope.hideAlert()
      expect(srv.isHidden).toHaveBeenCalled()

    it 'should call setHidden', ->
      srv.addHidden.calls.reset()
      expect(srv.addHidden).not.toHaveBeenCalled()
      isoScope.closeAlert()
      expect(srv.addHidden).toHaveBeenCalled()

    it 'toggleMore if showMore false should toggle and set moreLesstxt', ->
      isoScope.showMore = false
      isoScope.toggleMore()
      expect(isoScope.moreLessTxt).toEqual("Read Less")
      expect(isoScope.showMore).toBeTruthy()

    it 'toggleMore if showMore true should toggle and set moreLesstxt', ->
      isoScope.showMore = true
      isoScope.moreLessTxt = "Read Less"
      isoScope.toggleMore()
      expect(isoScope.moreLessTxt).toEqual("Read More")
      expect(isoScope.showMore).toBeFalsy()

  describe 'should show data', ->
    it 'sets summery', ->
      directives.checkClassTxt(".alert-summary", "Alert Teaser 1")

    it 'sets copy', ->
      isoScope.showMore = true;
      isoScope.$apply()
      directives.checkClassTxt(".alert-copy", "Alert Main Data 1")

  describe 'should show hide the right copy', ->
    teaser =  copy = toggle = null

    it 'should show teaser and correct link if showMore false', ->
      isoScope.showMore = false
      isoScope.$apply()
      teaser = document.querySelector(".alert-summary")
      copy   = document.querySelector(".alert-copy")
      toggle = angular.element(document.querySelector("a"))
      expect(teaser).toBeDefined()
      expect(copy).toBeNull()
      expect(toggle.text()).toEqual("Read More")

    it 'should show copy and correct link if showMore true', ->
      isoScope.showMore    = true
      isoScope.moreLessTxt = "Read Less"
      isoScope.$apply()
      teaser = document.querySelector(".alert-summary")
      copy   = document.querySelector(".alert-copy")
      toggle = angular.element(document.querySelector("a"))
      expect(teaser).toBeNull()
      expect(copy).toBeDefined()
      expect(toggle.text()).toEqual("Read Less")


  describe 'click functions', ->
    toggle = close = null
    beforeEach ->
      a = document.querySelectorAll("a")
      toggle = angular.element(_.first(a))
      close  = angular.element(_.last(a))
      spyOn(isoScope, "toggleMore")
      spyOn(isoScope, "closeAlert")


    it 'should call toggle when click', ->
      toggle.triggerHandler('click')
      expect(isoScope.toggleMore).toHaveBeenCalled()

    it 'should call close when click', ->
      close.triggerHandler('click')
      expect(isoScope.closeAlert).toHaveBeenCalled()






