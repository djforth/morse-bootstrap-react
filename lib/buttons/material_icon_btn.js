//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react/addons');
var _ = require("lodash");

// React-bootstrap: http://react-bootstrap.github.io/
var OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");
var Tooltip = require("react-bootstrap/lib/Tooltip");

//Mixins
var cssMixins = require("morse-react-mixins/lib/css_mixins");

var IconButton = (function (_React$Component) {
  _inherits(IconButton, _React$Component);

  function IconButton(props) {
    _classCallCheck(this, IconButton);

    _get(Object.getPrototypeOf(IconButton.prototype), "constructor", this).call(this, props);
    this.btn_css = ["btn"];
    this.icon_css = ["material-icons"];
    //Sets defaults
    this.state = {
      placement: "top",
      icon: this.getClasses(this.icon_css),
      btn: this.getClasses(this.btn_css)
    };
  }

  // Broken into separate function for testing

  _createClass(IconButton, [{
    key: "setBtnStyle",
    value: function setBtnStyle(type, additional) {
      var bt = type ? type : "default"; // Sets default btn css
      this.btn_css.push("btn-" + bt); // Adds to btn_css array for re-renders
      // Conditional loads additional css
      if (additional) {
        this.btn_css.push(additional); // Adds to btn_css array for re-renders
      }
      // Returns css for state
      return this.getClasses(this.btn_css); // Returns css string
    }
  }, {
    key: "setIconStyle",
    value: function setIconStyle(ic) {
      var icon = ic ? ic : "md-24"; //Sets default icon
      this.icon_css.push(icon); // Adds to icon_css array for re-renders

      return this.getClasses(this.icon_css); // Returns css string
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var options = this.props.options; // Makes reading a bit easier
      var state = _.clone(this.state); //clones state so we don't need to recreate structure
      //Sets placement or default
      state.placement = options.placement ? options.placement : state.placement;

      //sets default btn styling
      state.btn = this.setBtnStyle(options.button_type, options.additional_css);
      //Sets default icon styling
      state.icon = this.setIconStyle(this.props.size);

      this.setState(state); // Sets state to re-render component with correct classes
    }
  }, {
    key: "tooltip",
    value: function tooltip() {
      return React.createElement(
        Tooltip,
        null,
        this.props.title
      );
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        OverlayTrigger,
        { placement: this.state.placement, overlay: this.tooltip() },
        React.createElement(
          "a",
          { className: this.state.btn, href: this.props.path },
          React.createElement(
            "i",
            { className: this.state.icon },
            this.props.icon
          )
        )
      );
    }
  }]);

  return IconButton;
})(React.Component);

Object.assign(IconButton.prototype, cssMixins);

module.exports = IconButton;
//# sourceMappingURL=material_icon_btn.js.map