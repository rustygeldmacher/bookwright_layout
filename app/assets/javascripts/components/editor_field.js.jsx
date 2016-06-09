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
    } else if (e.keyCode == 13) {
      // Enter was pressed, blur the element
      e.target.blur();
    }
  },

  handleChange: function(e) {
    this.setState({value: e.target.value});
  },

  handleBlur: function(e) {
    if (this.valueHasChanged()) {
      let sanitizedValue = String(this.state.value).replace(/[^0-9.\-+/*]/g, '');
      this.state.value = eval(sanitizedValue);
      this.props.onChange(this.props.name, this.state.value);
    }
  },

  render: function() {
    return <input
      type="text"
      name={ this.props.name }
      value={ this.state.value }
      autoComplete="off"
      onKeyDown={ this.handleKeyDown }
      onChange={ this.handleChange }
      onBlur={ this.handleBlur }
      onFocus={ this.handleFocus }
    />
  }
});
