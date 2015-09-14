"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

// React-bootstrap: http://react-bootstrap.github.io/
var Navbar = require("react-bootstrap/lib/Navbar");
var CollapsibleNav = require("react-bootstrap/lib/CollapsibleNav");

var Navitems = require("./navitems");

// Morse Libraies
var ViewportDetect = require("viewport-detection-es6");

// console.log("WTF<<<<<<<<<<<")

var NavDropdown = (function (_React$Component) {
  _inherits(NavDropdown, _React$Component);

  function NavDropdown(props) {
    _classCallCheck(this, NavDropdown);

    _get(Object.getPrototypeOf(NavDropdown.prototype), "constructor", this).call(this, props);
    this.state = { device: "desktop" };
  }

  _createClass(NavDropdown, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var detect = new ViewportDetect();
      var device = detect.getDevice();
      this.size = detect.windowSize();
      this.setState({
        device: device
      });
      detect.trackSize((function (device, size) {
        if (this.state.device !== device) {
          this.setState({
            device: device
          });
        }

        this.size = size;
      }).bind(this));
    }
  }, {
    key: "link",
    value: function link() {
      return React.createElement(
        "a",
        { href: "/", title: "Go to Home" },
        this.props.title
      );
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        Navbar,
        { brand: this.link(), toggleNavKey: 0, inverse: true },
        React.createElement(
          CollapsibleNav,
          { eventKey: 0, key: _.uniqueId("collapsed") },
          React.createElement(Navitems, _extends({}, this.props, { key: "navitems", device: this.state.device }))
        )
      );
    }
  }]);

  return NavDropdown;
})(React.Component);

module.exports = NavDropdown;
//# sourceMappingURL=nav.js.map