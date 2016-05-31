window.ContainerEditor = React.createClass({
  getInitialState: function() {
    return {
      id: this.props.container.id,
      x: this.props.container.x,
      y: this.props.container.y,
      width: this.props.container.width,
      height: this.props.container.height
    };
  },

  changed: function(e) {
    let changedState = {};
    changedState[e.target.name] = e.target.value;
    this.setState(changedState);
  },

  handleUpdate: function(e) {
    e.preventDefault();
    this.props.onUpdate(this.state);
  },

  render: function() {
    return(
      <div id="container-editor">
        Edit container: {this.props.container.id}
        <form>
          <div className="field">
            <label for="y">Top:</label>
            <input type="text" name="y" value={this.state.y} onChange={this.changed} onBlur={this.handleUpdate} />
         </div>
          <div className="field">
            <label for="x">Left:</label>
            <input type="text" name="x" value={this.state.x} onChange={this.changed} onBlur={this.handleUpdate} />
          </div>
          <div className="field">
            <label for="width">Width:</label>
            <input type="text" name="width" value={this.state.width} onChange={this.changed} onBlur={this.handleUpdate} />
          </div>
          <div className="field">
            <label for="height">Height:</label>
            <input type="text" name="height" value={this.state.height} onChange={this.changed} onBlur={this.handleUpdate}/>
          </div>
        </form>
      </div>
    );
  }
});
