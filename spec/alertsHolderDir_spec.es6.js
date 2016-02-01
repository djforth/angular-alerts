require ('angular')
require ('angular-mocks')

require ('../src/alerts')

const _ = require('lodash')
const mockdata   = require("./factory/alerts_data.js")
const directives = require('@djforth/angular-jasmine-helpers').directiveTests;

describe('Alerts Holder Directive', function() {
  let element, scope, isoScope, fcty, promise, deferred, sp;

  beforeEach(function(){
    angular.mock.module('$alerts')
    angular.mock.inject(function($q, $sce, $rootScope, $controller, AlertsFcty){
      scope = $rootScope.$new()
      // Setup promise stubbing
      deferred  = $q.defer()
      promise   = deferred.promise
      spyOn(AlertsFcty, 'getData').and.returnValue(promise)
      fcty = AlertsFcty

      element = directives.createDirectiveHTML('<div alerts-holder></div>', scope)

      isoScope = element.isolateScope();
    })

  });

  afterEach(function() {
    angular.element(element).remove();
  });

  it("should exist", function() {
    expect(element).toBeDefined()
  });

  it("should hide alerts holder if no alerts", function() {
    directives.checkClassCss(".alerts-holder", "ng-hide")
  });

  describe('if there is data', function() {
    beforeEach(function() {
      deferred.resolve(mockdata)
      scope.$apply()
    });

    it("should hide alerts holder if no alerts", function() {
      directives.checkNoClassCss(".alerts-holder", "ng-hide")
    });

    describe('controls', function() {
      let a;

      beforeEach(function() {
        spyOn(scope, "hideAll")
        spyOn(scope, "showAll")
        a = element.find('a')
      });

      it("should call hideAll when clicked", function() {
        let el =  angular.element(_.first(a))

        el.triggerHandler('click')
        expect(scope.hideAll).toHaveBeenCalled()
      });

      it("should call showAll when clicked", function() {
        let el =  angular.element(a[1])
        el.triggerHandler('click')
        expect(scope.showAll).toHaveBeenCalled()
      });
    });
  });
});
















