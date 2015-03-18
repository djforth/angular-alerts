require 'angular'
require 'angular-mocks'

require '../../../javascripts/modules/alerts/alerts.coffee'
_ = require 'lodash'

mockdata    = require("../../../dummy_data/alerts_data.coffee")



directives = require('../../../support/utils/directives_tests.coffee')


describe 'Alerts Holder Directive', ->
  element = scope = isoScope = fcty = promise = deferred = spy = null
  beforeEach ->
    spy = jasmine.createSpy('spy');
    angular.mock.module('$alerts')
    angular.mock.inject(($q, $sce, $rootScope, $controller, AlertsFcty)->
        scope = $rootScope.$new()
        #Setup promise stubbing
        deferred  = $q.defer()
        promise   = deferred.promise
        spyOn(AlertsFcty, 'getData').and.returnValue(promise)
        fcty = AlertsFcty

        element = directives.createDirectiveHTML('<div alerts-holder></div>', scope)

        isoScope = element.isolateScope();
      )

  afterEach ->
    angular.element(element).remove();

  it 'should exist', ->
    # console.log element
    expect(element).toBeDefined()

  it 'should hide alerts holder if no alerts', ->
    directives.checkClassCss(".alerts-holder", "ng-hide")

  describe 'if there is data', ->
    beforeEach ->
      deferred.resolve(mockdata)
      scope.$apply()

    it 'should hide alerts holder if no alerts', ->
      directives.checkNoClassCss(".alerts-holder", "ng-hide")

    describe 'controls', ->
      a = null
      beforeEach ->
        spyOn(scope, "hideAll")
        spyOn(scope, "showAll")
        a = element.find('a')

      it 'should call hideAll when clicked', ->
        el =  angular.element(_.first(a))

        el.triggerHandler('click')
        expect(scope.hideAll).toHaveBeenCalled()

      it 'should call showAll when clicked', ->
        el =  angular.element(a[1])
        el.triggerHandler('click')

        expect(scope.showAll).toHaveBeenCalled()



  #   it 'should have 3 alerts', ->
  #     el = directives.checkNumElements(".alert", 3)

  #   it 'should set severity class', ->
  #     els = document.querySelectorAll('.alert')
  #     _.forEach(els, (e)->
  #       # el =  angular.element(e)
  #       expect(e.className.match(/high|medium|low/)).toBeTruthy()
  #       console.log e.className
  #     )

  #   describe 'hide alert', ->

  #     it 'should hide alert if hideAlert true', ->
  #       spyOn(scope, "hideAlert").and.returnValue(true)
  #       scope.$apply()
  #       els = document.querySelectorAll('.alert')
  #       _.forEach(els, (e)->
  #         el = angular.element(e)
  #         expect(el.hasClass("ng-hide")).toBeTruthy()
  #       )

  #     it 'should not hide alert if hideAlert false', ->
  #       spyOn(scope, "hideAlert").and.returnValue(false)
  #       scope.$apply()
  #       els = document.querySelectorAll('.alert')
  #       _.forEach(els, (e)->
  #         el = angular.element(e)
  #         expect(el.hasClass("ng-hide")).toBeFalsy()
  #       )

  #     it 'should return false if alert is not in list', ->
  #       expect(scope.hideAlert(mockdata[0])).toBeFalsy()

  #     it 'should return true if alert is  in list', ->
  #       scope.hidden.push(mockdata[0])
  #       expect(scope.hideAlert(mockdata[0])).toBeTruthy()

  #   describe 'closeAlert', ->

  #     it 'should call closeAlert when clicked', ->
  #       spyOn(scope, "closeAlert")
  #       el = document.querySelector('.alert')

  #       a  = el.querySelector('a')
  #       el =  angular.element(a)
  #       el.triggerHandler('click')
  #       expect(scope.closeAlert).toHaveBeenCalled()
  #       expect(scope.closeAlert).toHaveBeenCalledWith(mockdata[0])

  #     it 'should add alert into hidden list', ->
  #       scope.closeAlert(mockdata[0])
  #       expect(scope.hidden).toContain(mockdata[0])











