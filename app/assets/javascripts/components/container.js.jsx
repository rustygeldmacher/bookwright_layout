window.Container = React.createClass({
  render: function() {
    let containerStyle = {
      width: this.props.width + 'px',
      height: this.props.height + 'px',
      left: this.props.x + 'px',
      top: this.props.y + 'px'
    };

    let className = 'container';
    if (this.props.isSelected) {
      className += ' selected';
    }

    return(
      <div className={className} id={this.props.id} style={containerStyle} onClick={this.props.onClick}>
      </div>
    );
  }
});
