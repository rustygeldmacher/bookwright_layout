window.LayoutEditor = React.createClass({
  getInitialState: function() {
    return {
      currentPage: null,
      containers: [],
      selectedContainerId: null,
      measureDistanceFrom: 'edges'
    };
  },

  componentDidMount: function() {
    this.loadPageData(1);
  },

  loadPageData: function(pageNumber) {
    let pageUrl = '/books/1/pages/' + pageNumber;
    $.get(pageUrl).done(function(data) {
      this.setState({
        currentPage: pageNumber,
        selectedContainerId: null,
        containers: data.containers,
        margins: {
          top: parseFloat(data.margins.top),
          right: parseFloat(data.margins.right),
          bottom: parseFloat(data.margins.bottom),
          left: parseFloat(data.margins.left)
        }
      });
    }.bind(this));
  },

  savePageData: function() {
    let pageUrl = '/books/1/pages/' + this.state.currentPage;
    $.ajax({
      url: pageUrl,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        containers: this.state.containers
      })
    }).done(function(data) {
      console.log('saved!');
    }.bind(this));
  },

  loadNextPage: function() {
    this.loadPageData(this.state.currentPage + 1);
  },

  loadPreviousPage: function() {
    this.loadPageData(this.state.currentPage - 1);
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

  updateContainer: function(containerId, updates) {
    let container = this.findContainer(containerId);
    for (var key in updates) {
      container[key] = updates[key];
    }

    this.setState(this.state);
  },

  updateMeasureDistanceFrom: function(value) {
    this.setState({
      measureDistanceFrom: value
    });
  },

  render: function() {
    var containerEditor = null;
    if (this.state.selectedContainerId) {
      let selectedContainer = this.findContainer(this.state.selectedContainerId);
      containerEditor = <ContainerEditor
        key={this.state.selectedContainerId}
        containerId={this.state.selectedContainerId}
        x={selectedContainer.x}
        y={selectedContainer.y}
        width={selectedContainer.width}
        height={selectedContainer.height}
        marginTop={this.state.margins.top}
        marginLeft={this.state.margins.left}
        distanceFrom={this.state.measureDistanceFrom}
        onUpdate={this.updateContainer}
        onMeasureDistanceFromChanged={this.updateMeasureDistanceFrom}
      />;
    }

    let pageNavigation = null;
    if (this.state.currentPage) {
      pageNavigation = <PageNavigation
        currentPage={this.state.currentPage}
        onNext={this.loadNextPage}
        onPrev={this.loadPreviousPage}
        onSave={this.savePageData}
      />;
    }

    return(
      <div id="layout-editor">
        <Page
          margins={this.state.margins}
          containers={this.state.containers}
          selectedContainerId={this.state.selectedContainerId}
          onContainerSelected={this.containerSelected}
        />
        <div id="sidebar">
          { pageNavigation }
          { containerEditor }
        </div>
      </div>
    );
  }
});
