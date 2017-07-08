var $ = require('jquery');

function CommentsStore() {
   var commentsStoreObj = {
      getList: getList
   };
   return commentsStoreObj;

   function getList(commentsUrl, callback) {
      $.ajax({
         type: 'GET',
         url: commentsUrl,
         success: function(data) {
            callback(data);
         }
      });
   }
}
module.exports = CommentsStore;
