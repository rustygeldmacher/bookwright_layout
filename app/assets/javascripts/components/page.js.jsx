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

    let marginBox = null;
    if (this.props.margins) {
      const margins = this.props.margins;
      let borderWidth = [margins.top, margins.right, margins.bottom, margins.left].map(function(width) {
        return width + 'px';
      }).join(' ');

      let marginStyles = {
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
        height: '100%',
        borderStyle: 'solid',
        borderColor: '#dfbfdf',
        borderWidth: borderWidth,
        opacity: 0.2
      };
      marginBox = <div id="margins" style={ marginStyles }></div>;
    }

    return(
      <div id="the-page" className="even-page">
        { marginBox }
        { containers }
      </div>
    );
  }
});
