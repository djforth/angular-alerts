'use strict'

require('angular')
require('angular-resource')
_  = require('lodash')

# Utilities
# resizer = require('../utils/resizer.coffee')
require('../utils/venue_path.coffee')



alertsFcty      = require('./alertsFcty.coffee')
alertsSrv       = require('./alertsSrv.coffee')
alertsCtrl      = require('./alertsCtrl.coffee')
alertDir        = require('./alertDir.coffee')
alertsHolderDir = require('./alertsHolderDir.coffee')

alerts =  angular.module('$alerts', ['ngResource', 'mainTemplates','$venuePath'])
  .factory('AlertsFcty', alertsFcty)
  .service('AlertsSrv', alertsSrv)
  .controller('AlertsCtrl', alertsCtrl)
  .directive('alertsHolder', alertsHolderDir)
  .directive('alert', alertDir)

module.exports = alerts