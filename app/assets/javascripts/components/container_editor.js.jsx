window.ContainerEditor = React.createClass({
  getInitialState: function() {
    return this.calculateDimensions(this.props);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState(this.calculateDimensions(nextProps));
  },

  calculateDimensions: function(dimensions) {
    return {
      x: this.pixelsToInches(dimensions.x - this.leftAdjustment(dimensions)),
      y: this.pixelsToInches(dimensions.y - this.topAdjustment(dimensions)),
      width: this.pixelsToInches(dimensions.width),
      height: this.pixelsToInches(dimensions.height),
    };
  },

  topAdjustment: function(dimensions) {
    switch(dimensions.distanceFrom) {
      case 'margins':
        return dimensions.marginTop;
      default:
        return 0;
    }
  },

  leftAdjustment: function(dimensions) {
    switch(dimensions.distanceFrom) {
      case 'margins':
        return dimensions.marginLeft;
      default:
        return 0;
    }
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
      id: this.props.containerId,
      x: this.inchesToPixels(this.state.x) + this.leftAdjustment(this.props),
      y: this.inchesToPixels(this.state.y) + this.topAdjustment(this.props),
      width: this.inchesToPixels(this.state.width),
      height: this.inchesToPixels(this.state.height)
    });
  },

  handleFocus: function(e) {
    var target = e.target;
    setTimeout(function() {
      target.select();
    }, 0);
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
          onFocus={ this.handleFocus }
        />
      </div>
    );
  },

  measureDistanceFromChanged: function(e) {
    this.props.onMeasureDistanceFromChanged(e.target.value);
  },

  distanceFromRadio: function(value) {
    let checked = this.props.distanceFrom == value ? 'checked' : '';
    return <input type="radio"
      name="distance-from"
      value={value}
      checked={checked}
      onChange={this.measureDistanceFromChanged}
    />;
  },

  render: function() {
    return(
      <div id="container-editor">
        Edit container: {this.props.containerId}
        <form>
          { this.editorField('y', 'Top', this.state.y) }
          { this.editorField('x', 'Left', this.state.x) }
          { this.editorField('width', 'Width', this.state.width) }
          { this.editorField('height', 'Height', this.state.height) }
          <span>Distances from:</span>
          <div>
            { this.distanceFromRadio('edges') } Edges
            { this.distanceFromRadio('margins') } Margins
          </div>
        </form>
      </div>
    );
  }
});
