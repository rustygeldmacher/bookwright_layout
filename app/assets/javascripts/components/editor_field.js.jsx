window.EditorField = React.createClass({
  getInitialState: function() {
    return({
      value: this.props.initialValue
    });
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: nextProps.initialValue
    });
  },

  valueHasChanged: function() {
    return String(this.state.value) !== String(this.props.initialValue);
  },

  handleFocus: function(e) {
    var target = e.target;
    setTimeout(function() {
      target.select();
    }, 0);
  },

  handleKeyDown: function(e) {
    if (e.keyCode == 27) {
      // Escape key was pressed, reset our value if needed
      if (this.valueHasChanged()) {
        this.setState({value: this.props.initialValue});
      }
    }
  },

  handleChange: function(e) {
    this.setState({value: e.target.value});
  },

  handleBlur: function(e) {
    if (this.valueHasChanged()) {
      this.props.onChange(this.props.name, this.state.value);
    }
  },

  render: function() {
    return <input
      type="text"
      name={ this.props.name }
      value={ this.state.value }
      onKeyDown={ this.handleKeyDown }
      onChange={ this.handleChange }
      onBlur={ this.handleBlur }
      onFocus={ this.handleFocus }
    />
  }
});
