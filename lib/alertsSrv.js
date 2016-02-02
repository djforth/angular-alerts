'use strict';

var _ = require('lodash');
var Cookie = require('@djforth/cookie_mgmt');

module.exports = function () {
  var cookie = new Cookie();

  var processCookie = function processCookie(c) {
    if (_.isUndefined(c)) {
      return [];
    }

    var list = c.split(',');
    return _.map(list, function (i) {
      return parseInt(i);
    });
  };

  var hidden = processCookie(cookie.getCookie("alerts"));

  return {
    addHidden: function addHidden(a) {
      hidden.push(a.id);
      this.cookie.createCookie("alerts", hidden, 1);
    },

    hideAll: function hideAll(alerts) {
      hidden = _.pluck(alerts, "id");
      this.cookie.createCookie("alerts", hidden, 1);
    },

    cookie: cookie,

    hiddenList: function hiddenList() {
      return hidden;
    },

    isHidden: function isHidden(a) {
      return _.contains(hidden, a.id);
    },

    loadHidden: function loadHidden() {
      hidden = this.processCookie(this.cookie.getCookie("alerts"));
    },

    processCookie: processCookie,

    resetHidden: function resetHidden() {
      hidden = [];
      this.cookie.deleteCookie("alerts");
    },

    setHidden: function setHidden(h) {
      hidden = h;
    }

  };
};