var React = require('react');
var IssuesDetailsStore = require('./../store/IssuesDetailsStore.js')();
var Comments = require('./Comments.react');
var getTextColorForLabel = require('./../utils/colorMap.js').getTextColorForLabel;

var IssuesDetails = React.createClass({
   getInitialState: function() {
      return {issuesDetails: undefined};
   },
   componentDidMount: function() {
      var that = this;
      var issueNo = this.props.params.id;
      IssuesDetailsStore.getDetails(issueNo, function(data) {
         if (that.isMounted()) {
            that.setState({issuesDetails: data});
         }
      });
   },
   render: function() {
      var issuesDetails = this.state.issuesDetails;
      var commentsList;
      if(issuesDetails) {
          if(issuesDetails.comments) {
              commentsList = <Comments commentsUrl={issuesDetails.comments_url}/>;
          } else {
              commentsList = '';
          }
          return (
             <div className="issuesDetails">
                   <h3>{issuesDetails.title}</h3>
                   <label className="state">{issuesDetails.state}</label>
                       {issuesDetails.labels.map(function(labelObj){
                           var labelStyle = {
                             "backgroundColor": "#" + labelObj.color,
                             "color": "#" + getTextColorForLabel(labelObj),

                           };
                         return <span key={labelObj.name} className="label" style={labelStyle}>{labelObj.name}</span>
                       })}
                <div className="header">
                   <img src={issuesDetails.user.avatar_url} />
                   <label className="name">{issuesDetails.user.login}</label>
                   <span>posted</span>
                </div>
                  <label className="body">{issuesDetails.body}</label>
                  {commentsList}
             </div>

          )
      } else {
          return (<div></div>)
      }

   }

});

module.exports = IssuesDetails;
