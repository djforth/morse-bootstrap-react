//Libraries
const React  = require('react/addons');
const _      = require("lodash");

// React-bootstrap: http://react-bootstrap.github.io/
var OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");
var Tooltip        = require("react-bootstrap/lib/Tooltip");

//Mixins
const cssMixins  = require("morse-react-mixins/lib/css_mixins");

class IconButton extends React.Component {
  constructor(props) {
    super(props);
    this.btn_css  = ["btn"];
    this.icon_css = ["glyphicon"];
    //Sets defaults
    this.state    = {
      placement : "top",
      icon      : this.getClasses(this.icon_css),
      btn       : this.getClasses(this.btn_css)
    };
  }

  // Broken into separate function for testing
  setBtnStyle(type, additional){
    let bt = (type) ? type : "default"; // Sets default btn css
    this.btn_css.push(`btn-${bt}`);// Adds to btn_css array for re-renders
    // Conditional loads additional css
    if(additional){
      this.btn_css.push(additional);// Adds to btn_css array for re-renders
    }
    // Returns css for state
    return this.getClasses(this.btn_css); // Returns css string
  }

  setIconStyle(ic){
    let icon = (ic) ? ic : "glyphicon-edit"; //Sets default icon
    this.icon_css.push(icon);// Adds to icon_css array for re-renders

    return this.getClasses(this.icon_css);// Returns css string
  }

  componentDidMount() {
    let options = this.props.options; // Makes reading a bit easier
    let state   = _.clone(this.state); //clones state so we don't need to recreate structure
    //Sets placement or default
    state.placement = (options.placement) ? options.placement : state.placement;

    //sets default btn styling
    state.btn = this.setBtnStyle(options.button_type, options.additional_css);
    //Sets default icon styling
    state.icon = this.setIconStyle(this.props.icon);

    this.setState(state); // Sets state to re-render component with correct classes
  }

  tooltip() {
    return (
      <Tooltip>{this.props.title}</Tooltip>
    );
  }

  render() {
    return (
      <OverlayTrigger placement={this.state.placement} overlay={this.tooltip()}>
        <a className={this.state.btn} href={this.props.path}>
          <span className={this.props.icon}></span>
        </a>
      </OverlayTrigger>
    );
  }
}

Object.assign(IconButton.prototype, cssMixins);

module.exports = IconButton;
