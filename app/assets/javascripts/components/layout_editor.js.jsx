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
        containers: data.containers,
        margins: data.margins
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
