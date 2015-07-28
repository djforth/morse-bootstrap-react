//Libraries
const React          = require('react/addons');

// React-bootstrap: http://react-bootstrap.github.io/
var OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");
var Tooltip        = require("react-bootstrap/lib/Tooltip");

class IconButton extends React.Component {
  constructor(props) {
    super(props);
  }

  tooltip() {
    return (
      <Tooltip>{this.props.title}</Tooltip>
    );
  }

  render() {
    let options = this.props.options;

    return (
      <OverlayTrigger placement={options.placement} overlay={this.tooltip()}>
        <a className={`btn btn-${options.button_type} ${options.additional_css}`} href={this.props.path}>
          <span className={`glyphicon ${this.props.icon}`}></span>
        </a>
      </OverlayTrigger>
    );
  }
}

module.exports = IconButton;
