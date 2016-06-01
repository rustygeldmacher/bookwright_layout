window.LayoutEditor = React.createClass({
  getInitialState: function() {
    return {
      currentPage: null,
      containers: [],
      selectedContainerId: null
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
        containers: data.containers
      });
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

    let pageNavigation = null;
    if (this.state.currentPage) {
      pageNavigation = <PageNavigation
        currentPage={this.state.currentPage}
        onNext={this.loadNextPage}
        onPrev={this.loadPreviousPage}
      />;
    }

    return(
      <div id="layout-editor">
        <Page
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
