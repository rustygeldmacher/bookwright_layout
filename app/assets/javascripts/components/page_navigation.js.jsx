window.PageNavigation = React.createClass({
  previousClicked: function(e) {
    e.preventDefault();
    this.props.onPrev();
  },

  nextClicked: function(e) {
    e.preventDefault();
    this.props.onNext();
  },

  saveClicked: function(e) {
    e.preventDefault();
    this.props.onSave();
  },

  render: function() {
    return(
      <div id="page-navigation" className="sidebar">
        <a href="#" onClick={this.previousClicked}>&laquo;</a>
        Page: { this.props.currentPage }
        <a href="#" onClick={this.nextClicked}>&raquo;</a>
        <div className="actions">
          <button onClick={this.saveClicked}>Save Page</button>
        </div>
      </div>
    );
  }
});
