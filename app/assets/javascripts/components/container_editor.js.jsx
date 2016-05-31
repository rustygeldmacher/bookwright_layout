window.ContainerEditor = React.createClass({
  getInitialState: function() {
    return {
      id: this.props.container.id,
      x: this.pixelsToInches(this.props.container.x),
      y: this.pixelsToInches(this.props.container.y),
      width: this.pixelsToInches(this.props.container.width),
      height: this.pixelsToInches(this.props.container.height)
    };
  },

  pixelsToInches: function(value) {
    return parseFloat(value) / 72.0;
  },

  inchesToPixels: function(value) {
    return parseFloat(value) * 72.0;
  },

  changed: function(e) {
    let changedState = {};
    changedState[e.target.name] = e.target.value;
    this.setState(changedState);
  },

  handleUpdate: function(e) {
    e.preventDefault();
    this.props.onUpdate({
      id: this.state.id,
      x: this.inchesToPixels(this.state.x),
      y: this.inchesToPixels(this.state.y),
      width: this.inchesToPixels(this.state.width),
      height: this.inchesToPixels(this.state.height)
    });
  },

  editorField: function(name, label, value) {
    return(
      <div className="field">
        <label for={ name }>{ label }:</label>
        <input
          type="text"
          name={ name }
          value={ value }
          onChange={ this.changed }
          onBlur={ this.handleUpdate }
        />
      </div>
    );
  },

  render: function() {
    return(
      <div id="container-editor">
        Edit container: {this.props.container.id}
        <form>
          { this.editorField('y', 'Top', this.state.y) }
          { this.editorField('x', 'Left', this.state.x) }
          { this.editorField('width', 'Width', this.state.width) }
          { this.editorField('height', 'Height', this.state.height) }
        </form>
      </div>
    );
  }
});
