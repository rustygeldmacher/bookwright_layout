window.ContainerEditor = React.createClass({
  pixelsToInches: function(value) {
    return parseFloat(value) / 72.0;
  },

  inchesToPixels: function(value) {
    return parseFloat(value) * 72.0;
  },

  topAdjustment: function() {
    switch(this.props.distanceFrom) {
      case 'margins':
        return this.props.marginTop;
      default:
        return 0;
    }
  },

  leftAdjustment: function() {
    switch(this.props.distanceFrom) {
      case 'margins':
        return this.props.marginLeft;
      default:
        return 0;
    }
  },

  convertInbound: function(name, value) {
    switch(name) {
      case 'x':
        return this.pixelsToInches(parseFloat(value) - this.leftAdjustment());
      case 'y':
        return this.pixelsToInches(parseFloat(value) - this.topAdjustment());
      case 'width':
        return this.pixelsToInches(value);
      case 'height':
        return this.pixelsToInches(value);
    }
  },

  convertOutbound: function(name, value) {
    switch(name) {
      case 'x':
        return this.inchesToPixels(value) + this.leftAdjustment();
      case 'y':
        return this.inchesToPixels(value) + this.topAdjustment();
      case 'width':
        return this.inchesToPixels(value);
      case 'height':
        return this.inchesToPixels(value);
    }
  },

  valueEdited: function(name, value) {
    let updates = {};
    updates[name] = this.convertOutbound(name, value);
    this.props.onUpdate(this.props.containerId, updates);
  },

  editorField: function(name, label, value) {
    let initialValue = this.convertInbound(name, value);
    return(
      <div className="field">
        <label for={ name }>{ label }:</label>
        <EditorField
          name={ name }
          initialValue={ initialValue }
          onChange={ this.valueEdited }
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
          { this.editorField('y', 'Top', this.props.y) }
          { this.editorField('x', 'Left', this.props.x) }
          { this.editorField('width', 'Width', this.props.width) }
          { this.editorField('height', 'Height', this.props.height) }
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
