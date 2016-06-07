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

  handleFocus: function(e) {
    var target = e.target;
    setTimeout(function() {
      target.select();
    }, 0);
  },

  handleChange: function(e) {
    this.setState({value: e.target.value});
  },

  handleBlur: function(e) {
    this.props.onChange(this.props.name, this.state.value);
  },

  render: function() {
    return <input
      type="text"
      name={ this.props.name }
      value={ this.state.value }
      onChange={ this.handleChange }
      onBlur={ this.handleBlur }
      onFocus={ this.handleFocus }
    />
  }
});
