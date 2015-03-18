'use strict'

_ = require('lodash')
Cookie = require('manage-cookies')

module.exports = ()->
  cookie = new Cookie()
  processCookie = (c)->
    return [] if _.isUndefined(c)
    list = c.split(',')
    return _.map(list, (i)->
      return parseInt(i)
    )

  hidden = processCookie(cookie.getCookie("alerts"))
  console.log hidden

  return {
    addHidden:(a)->
      # console.log "hidden", hidden
      hidden.push a.id
      @cookie.createCookie("alerts", hidden, 1)

    hideAll:(alerts)->
      hidden = _.pluck(alerts, "id")
      @cookie.createCookie("alerts", hidden, 1)

    cookie:cookie
    hiddenList:()->
      return hidden

    isHidden:(a)->
      return _.contains(hidden, a.id)

    loadHidden:()->
      hidden = @processCookie(@cookie.getCookie("alerts"))

    processCookie:processCookie

    resetHidden:()->
      hidden = []
      @cookie.deleteCookie("alerts")

    setHidden:(h)->
      hidden = h

  }