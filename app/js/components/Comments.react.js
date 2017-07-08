var React = require('react');
var CommentsStore = require('./../store/CommentsStore.js')();
var Comments = React.createClass({
   getInitialState: function() {
      return {commentsList: undefined};
   },
   componentDidMount: function() {
      var that = this;
      var commentsUrl = this.props.commentsUrl;
      CommentsStore.getList(commentsUrl, function(data) {
         if (that.isMounted()) {
            that.setState({commentsList: data});
         }
      });
   },
   render: function() {
      var commentsList = this.state.commentsList;
      if (commentsList && commentsList.length) {
         var list = commentsList.map(function(comment) {
            var body = comment.body;
            function createMarkupWithLinks() {
                var formattedBody = body.replace(/@\S\w*/g, function(match) {
                   var name = match.substr(1);
                   var href = "http://github.com/" + name;
                   return '<a href=\"' + href +'\">' + name + '</a>';
               });
                return {
                   __html: formattedBody
                }
            }
            return (
               <div className="comment" key={comment.id}>
                  <div className="header">
                     <img src={comment.user.avatar_url}/>
                     <label className="name">{comment.user.login}</label>
                     <span>commented</span>
                  </div>
                  <div className="comment-detail" dangerouslySetInnerHTML={createMarkupWithLinks()}/>

               </div>
            )
         });
         return (
            <div className="commentsList">
               {list}
            </div>
         )
      } else {
         return (
            <div></div>
         )
      }
   }
});

module.exports = Comments;
