"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

// Morse Libraies
var ViewportDetect = require("viewport-detection-es6");

// React-bootstrap: http://react-bootstrap.github.io/
// const bootstrap  = require("react-bootstrap");
var Nav = require("react-bootstrap/lib/Nav");
var NavItem = require("react-bootstrap/lib/NavItem");
var Badge = require("react-bootstrap/lib/Badge");
// const IconBtn  = require("morse-bootstrap-react").Material.Icon;

var iconMixins = require("../mixins/icon_mixins");
var navMixins = require("../mixins/nav_mixins");
var cssMixins = require("morse-react-mixins").css_mixins;

var Subnav = (function (_React$Component) {
  _inherits(Subnav, _React$Component);

  function Subnav(props) {
    _classCallCheck(this, Subnav);

    _get(Object.getPrototypeOf(Subnav.prototype), "constructor", this).call(this, props);
    // this.navShow = [ "navbar-collapse", "collapse", {in:false}];
    this.btnShow = [{ hide: true }, "navbar-header"];
    this.state = { device: "desktop", navShow: true, btnShow: this.getClasses(this.btnShow) };
  }

  _createClass(Subnav, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this = this;

      var detect = new ViewportDetect();
      var device = detect.getDevice();
      this.setButton(device);

      this.setState({
        device: device
      });
      detect.trackSize(function (device, size) {
        if (_this.state.device !== device) {
          _this.setButton(device);
        }

        _this.size = size;
      });
    }
  }, {
    key: "createNavItem",
    value: function createNavItem(ni, n) {
      return React.createElement(
        NavItem,
        { eventKey: n, href: ni.path, active: this.isSelected(ni.active), key: _.uniqueId("navitem") },
        this.createTitle(ni)
      );
    }
  }, {
    key: "renderNav",
    value: function renderNav() {
      var _this2 = this;

      var navlist = _.map(this.props.items, function (ni, i) {
        return _this2.createNavItem(ni, i);
      });

      return navlist;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: "clearfix" },
        React.createElement(
          "div",
          { className: this.state.btnShow },
          React.createElement(
            "button",
            { className: "navbar-toggle", onClick: this._onClick.bind(this) },
            React.createElement(
              "i",
              { className: "material-icons md-24" },
              "more_vert"
            )
          )
        ),
        React.createElement(
          Nav,
          { bsStyle: 'tabs', justified: true, expanded: this.state.navShow },
          this.renderNav()
        )
      );
    }
  }, {
    key: "setButton",
    value: function setButton(device) {
      var state = _.clone(this.state);
      this.btnShow = [{ hide: device !== "mobile" }, "navbar-header"];
      state.btnShow = this.getClasses(this.btnShow);
      state.device = device;
      state.navShow = device !== "mobile";
      this.setState(state);
    }
  }, {
    key: "_onClick",
    value: function _onClick(e) {
      e.preventDefault();
      this.setState({ navShow: !this.state.navShow });
    }
  }]);

  return Subnav;
})(React.Component);

Object.assign(Subnav.prototype, iconMixins);
Object.assign(Subnav.prototype, navMixins);
Object.assign(Subnav.prototype, cssMixins);

module.exports = Subnav;
//# sourceMappingURL=secondary_nav.js.map