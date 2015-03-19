'use strict'

const _      = require('lodash')
const Cookie = require('cookie_mgmt')

module.exports = function(){
  let cookie = new Cookie();

  const processCookie = function (c){
    if(_.isUndefined(c)){
      return [];
    }

    let list = c.split(',');
    return _.map(list, i =>{
      return parseInt(i);
    });
  };

  let hidden = processCookie(cookie.getCookie("alerts"))

  return {
    addHidden: function(a){
      hidden.push(a.id);
      this.cookie.createCookie("alerts", hidden, 1);
    },

    hideAll:function(alerts){
      hidden = _.pluck(alerts, "id")
      this.cookie.createCookie("alerts", hidden, 1)
    },

    cookie:cookie,

    hiddenList:function(){
       return hidden;
    },

    isHidden:function(a){
      return _.contains(hidden, a.id);
    },

    loadHidden:function(){
      hidden = this.processCookie(this.cookie.getCookie("alerts"))
    },

    processCookie:processCookie,

    resetHidden:function(){
      hidden = []
      this.cookie.deleteCookie("alerts")
    },

    setHidden:function(h){
      hidden = h
    }




  }

}
