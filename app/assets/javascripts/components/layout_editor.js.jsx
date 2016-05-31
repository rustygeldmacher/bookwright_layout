window.LayoutEditor = React.createClass({
  getInitialState: function() {
    return {
      containers: this.props.containers,
      selectedContainerId: null
    };
  },

  containerSelected: function(e) {
    this.state.selectedContainerId = e.target.id;
    this.setState(this.state);
  },

  findContainer: function(id) {
    return this.state.containers.find(function(container) {
      return container.id == id;
    });
  },

  updateContainer: function(values) {
    let container = this.findContainer(values.id);
    container.x = values.x;
    container.y = values.y;
    container.width = values.width;
    container.height = values.height;
    this.setState(this.state);
  },

  render: function() {
    var containerEditor = null;
    if (this.state.selectedContainerId) {
      let selectedContainer = this.findContainer(this.state.selectedContainerId);
      containerEditor = <ContainerEditor
        key={this.state.selectedContainerId}
        container={selectedContainer}
        onUpdate={this.updateContainer}
      />;
    }
    return(
      <div id="layout-editor">
        <Page
          containers={this.state.containers}
          selectedContainerId={this.state.selectedContainerId}
          onContainerSelected={this.containerSelected}
        />
        { containerEditor }
      </div>
    );
  }
});
