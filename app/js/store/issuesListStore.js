var $ = require('jquery');
var appConstant = require('./../constants/appConstants');
function IssuesListStore() {
   var IssuesListStoreObj = {
      getList: getList
   };
   return IssuesListStoreObj;

   function getList(page, callback) {
      var url = appConstant.ISSUES_LIST_URL;
      if (page) {
         url = url + '&page=' + page;
      }
      $.ajax({
         type: 'GET',
         url: url,
         success: function(data, status, jxhr) {
            var link = jxhr.getResponseHeader('Link');
            data.paging = getPagingData(link);
            callback(data);
         }
      });
   }

   function getPagingData(link) {
      var links = link.split(',');
      var paging = {};
      links.forEach(function(link) {
         var url = link.split(';')[0].replace(/<|>/g, '');
         var params = url.split('?')[1].split('&');
         var pageNo;
         for (var i = 0; i < params.length; i++) {
            if (params[i].indexOf('page') !== -1) {
               pageNo = params[i].split("=")[1];
            }
         }
         if ((link.split(';')[1]).indexOf("first") !== -1) {
            paging.first = pageNo;
         }
         if ((link.split(';')[1]).indexOf("last") !== -1) {
            paging.last = pageNo;
         }
         if ((link.split(';')[1]).indexOf("next") !== -1) {
            paging.next = pageNo;
         }
         if ((link.split(';')[1]).indexOf("prev") !== -1) {
            paging.prev = pageNo;
         }
      });
      return paging;
   }
}
module.exports = IssuesListStore;
