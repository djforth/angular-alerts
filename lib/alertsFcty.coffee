'use strict'
_ = require('lodash')

Uri_parser = require("uriparser")
uriparser = new Uri_parser()
path = _.last(uriparser.uri_parsed.pathsplit)

DateFormatter = require("date-formatter")
dateFmt       = new DateFormatter()

module.exports = ($http, $q, Venuepath)->
  alertData = []
  urlPath = null

  return {
    addDate:(data)->
      _.forEach data, (d)->

        d.pubDate = dateFmt.dateFix(d.published)
        d.fmtPub  = dateFmt.formatDate(d.pubDate, "%d/%m/%Y")

      data

    data:()->
      alertData

    flush:()->
      alertData = []

    getData:(id)->
      deferred = $q.defer()

      if _.isEmpty(alertData)
        path = Venuepath.getVenue()

        that = @
        $http.get("/api/#{path}/alerts.json")
        .success( (data)->
          alertData = data
          deferred.resolve(alertData)
        )
        .error ()->
          deferred.reject("An error occurred while fetching items, we have been notified and are investigating.  Please try again later")
      else
        deferred.resolve(alertData)

      deferred.promise

    setData:(d)->
      alertData = d
  }