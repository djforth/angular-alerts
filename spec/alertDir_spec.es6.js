require ('angular');
require ('angular-mocks');

require ('../lib/alerts.es6.js');

const _ = require('lodash');
const mockdata = require("./factory/alerts_data.js");
const directives = require('directives-tests');

describe('Alert Directive', function() {
  let element,
      scope,
      isoScope,
      fcty,
      promise,
      deferred,
      spySet,
      spyHiddden,
      srv;

  beforeEach(function(){
    angular.mock.module('$alerts')
    angular.mock.inject(function($q, $sce, $rootScope, $controller, AlertsFcty, AlertsSrv){

      scope = $rootScope.$new()
      //Setup promise stubbing
      deferred  = $q.defer()
      promise   = deferred.promise
      spyOn(AlertsFcty, 'getData').and.returnValue(promise)
      fcty = AlertsFcty
      srv  = AlertsSrv

      let AlertsCtrlMock = jasmine.createSpy('AlertsCtrl')

      scope.alert = mockdata[0]
      scope.$apply()

      element = directives.createNestedDirectiveHTML(
        '<div fake-dir><div alert alertdata="alert"></div><div>',
        scope,
        {title:'$alertsHolderController', mock:AlertsCtrlMock}
      )

      isoScope = element.isolateScope();

    });
  });

  afterEach(function() {
    angular.element(element).remove();
  });

  it("should exist", function() {
    expect(element).toBeDefined()
  });

  it("defaults", function() {
    expect(isoScope.moreLessTxt).toEqual("Read More")
    expect(isoScope.showMore).toBeFalsy()
  });

  it("defaults", function() {
    expect(isoScope.moreLessTxt).toEqual("Read More")
    expect(isoScope.showMore).toBeFalsy()
  });

  describe('link functions', function() {
    beforeEach(function() {
      spyOn(srv, "addHidden")
      spyOn(srv, "isHidden")
    });

    it("should call isHidden", function() {
      srv.isHidden.calls.reset()
      expect(srv.isHidden).not.toHaveBeenCalled()
      isoScope.hideAlert()
      expect(srv.isHidden).toHaveBeenCalled()
    });

    it("should call setHidden", function() {
      srv.addHidden.calls.reset()
      expect(srv.addHidden).not.toHaveBeenCalled()
      isoScope.closeAlert()
      expect(srv.addHidden).toHaveBeenCalled()
    });

    it("toggleMore if showMore false should toggle and set moreLesstxt", function() {
      isoScope.showMore = false
      isoScope.toggleMore()
      expect(isoScope.moreLessTxt).toEqual("Read Less")
      expect(isoScope.showMore).toBeTruthy()
    });

    it("toggleMore if showMore true should toggle and set moreLesstxt", function() {
      isoScope.showMore = true
      isoScope.moreLessTxt = "Read Less"
      isoScope.toggleMore()
      expect(isoScope.moreLessTxt).toEqual("Read More")
      expect(isoScope.showMore).toBeFalsy()
    });
  });

  describe('should show data', function() {
    it("sets summery", function() {
      directives.checkClassTxt(".alert-summary", "Alert Teaser 1")
    });

    it("sets copy", function() {
      isoScope.showMore = true;
      isoScope.$apply()
      directives.checkClassTxt(".alert-copy", "Alert Main Data 1")
    });
  });

  describe('should show hide the right copy', function() {
    let teaser,  copy, toggle;

    it("should show teaser and correct link if showMore false", function() {
      isoScope.showMore = false
      isoScope.$apply()
      teaser = document.querySelector(".alert-summary")
      copy   = document.querySelector(".alert-copy")
      toggle = angular.element(document.querySelector("a"))
      expect(teaser).toBeDefined()
      expect(copy).toBeNull()
      expect(toggle.text()).toEqual("Read More")
    });

    it("should show copy and correct link if showMore true", function() {
      isoScope.showMore    = true
      isoScope.moreLessTxt = "Read Less"
      isoScope.$apply()
      teaser = document.querySelector(".alert-summary")
      copy   = document.querySelector(".alert-copy")
      toggle = angular.element(document.querySelector("a"))
      expect(teaser).toBeNull()
      expect(copy).toBeDefined()
      expect(toggle.text()).toEqual("Read Less")
    });
  });

  describe('click functions', function() {
    let toggle, close;

    beforeEach(function(){
      let a = document.querySelectorAll("a")
      toggle = angular.element(_.first(a))
      close  = angular.element(_.last(a))
      spyOn(isoScope, "toggleMore")
      spyOn(isoScope, "closeAlert")
    })

    it("should call toggle when click", function() {
      toggle.triggerHandler('click')
      expect(isoScope.toggleMore).toHaveBeenCalled()
    });

    it("should call close when click", function() {
      toggle.triggerHandler('click')
      expect(isoScope.toggleMore).toHaveBeenCalled()
    });
  });


});







