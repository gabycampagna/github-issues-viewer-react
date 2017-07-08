var React = require('react');
var issuesListStore = require('./../store/IssuesListStore.js')();
var Pagination = require('./Pagination.react.js');
var IssueItem = require('./IssueItem.react.js');

var IssuesList = React.createClass({
    getInitialState: function() {
        return {
            issuesList: [],
            paging: {}
        };
    },
    componentDidMount: function() {
        var that = this;
        var page = urlParam("page");
        issuesListStore.getList(page, function(data) {
            if(that.isMounted()) {
                that.setState({
                    issuesList: data,
                    paging: data.paging
                });
            }
        });
    },
   render: function() {
      var list = this.state.issuesList.map(function(issue) {
         return (<IssueItem issues={issue} key={issue.id}/>);
      });
      return (
          <div className="issuesList">
              <ul>
                  {list}
              </ul>
              <Pagination paging={this.state.paging}/>
          </div>
      )
   }
});

function urlParam(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results ?results[1] : null;
}

module.exports = IssuesList;
