var $ = require('jquery');
var appConstant = require('./../constants/appConstants');

function IssuesDetailsStore() {
   var issuesDetailsStoreObj = {
      getDetails: getDetails
   };
   return issuesDetailsStoreObj;

   function getDetails(issueNo, callback) {
      var url = appConstant.ISSUES_DETAILS_URL + issueNo;
      $.ajax({
         type: 'GET',
         url: url,
         success: function(data) {
            callback(data);
         }
      });
   }
}
module.exports = IssuesDetailsStore;
