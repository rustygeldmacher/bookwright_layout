window.PageNavigation = React.createClass({
  render: function() {
    return(
      <div id="page-navigation" className="sidebar">
        <a href="#" onClick={this.props.onPrev}>&laquo;</a>
        Page: { this.props.currentPage }
        <a href="#" onClick={this.props.onNext}>&raquo;</a>
      </div>
    );
  }
});
