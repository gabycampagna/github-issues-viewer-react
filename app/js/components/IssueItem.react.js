var React = require('react');
var Link = require('react-router').Link;

var IssueItem = React.createClass({
   render: function() {
      var summary = getSummary(this.props.issues.body);
      var issuesHref = "/issues/" + this.props.issues.number;
      var comments;
      if (this.props.issues.comments) {
          comments = <span className="commentIcon glyphicon glyphicon-comment" aria-hidden="true"><span className="commentNo">{this.props.issues.comments}</span></span>
      }
      return (
         <li>
           <div className="title">
              <Link to={issuesHref}>{this.props.issues.title}</Link>
              <span className="id">#{this.props.issues.number}</span>
           </div>
            <img src={this.props.issues.user.avatar_url}/>
            <div className="heading">
               <label className="user-name">{this.props.issues.user.login}
                  {this.props.issues.labels.map(function(labelObj) {
                     var labelStyle = {
                        "backgroundColor": "#" + labelObj.color
                     };
                     return <span key={labelObj.name} className="label" style={labelStyle}>{labelObj.name}</span>
                  })}
               </label>
               {comments}
            </div>
            <label className="summary">{summary}</label>
         </li>
      );
   }
});

function getSummary(str) {
   var maxCharacters = 140;
   var briefSummary = str.substring(0, maxCharacters);
   while (briefSummary[maxCharacters] && briefSummary[maxCharacters] !== ' ') {
      maxCharacters--;
   }
   return briefSummary.substring(0, maxCharacters);
}

module.exports = IssueItem;
