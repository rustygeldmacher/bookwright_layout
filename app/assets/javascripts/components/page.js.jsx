window.Page = React.createClass({
  render: function() {
    var containers = this.props.containers.map(function(container) {
      var isSelected = container.id == this.props.selectedContainerId;
      return (
        <Container
          key={container.id}
          id={container.id}
          x={container.x}
          y={container.y}
          width={container.width}
          height={container.height}
          isSelected={isSelected}
          onClick={this.props.onContainerSelected}
        >
        </Container>
      );
    }.bind(this));

    return(
      <div id="the-page" className="even-page">
        {containers}
      </div>
    );
  }
});
