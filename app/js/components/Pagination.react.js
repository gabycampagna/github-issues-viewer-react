var React = require('react');
var Pagination = React.createClass({
    render: function() {
        var first = generatePageHref(this.props.paging.first);
        var last = generatePageHref(this.props.paging.last);
        var next = generatePageHref(this.props.paging.next);
        var prev = generatePageHref(this.props.paging.prev);
        var prevEl, nextEl, firstEl, lastEl;
        if(next) {
            nextEl = <a href={next} className="next">next</a>
        } else {
            nextEl = <span>next</span>
        }
        if(prev) {
            prevEl = <a href={prev} className="previous">previous</a>
        } else {
            prevEl = <span>previous</span>
        }
        if(first) {
            firstEl = <a href={first} className="first">first</a>
        } else {
            firstEl = <span>first</span>
        }
        if(last) {
            lastEl = <a href={last} className="last">last</a>
        } else {
            lastEl = <span>last</span>
        }


        return (
        <div className="pagination">
            {prevEl}
            {firstEl}
            {lastEl}
            {nextEl}
        </div>
        );
    }
});
function generatePageHref(page) {
    return page ? "?page=" + page : "";
}

module.exports = Pagination;
