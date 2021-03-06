"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

var iconMixins = require("../mixins/icon_mixins");
var navMixins = require("../mixins/nav_mixins");

// React-bootstrap: http://react-bootstrap.github.io/
// const bootstrap  = require("react-bootstrap");
var DropdownButton = require("react-bootstrap/lib/DropdownButton");
var MenuItem = require("react-bootstrap/lib/MenuItem");

var DropDown = (function (_React$Component) {
  _inherits(DropDown, _React$Component);

  function DropDown(props) {
    _classCallCheck(this, DropDown);

    _get(Object.getPrototypeOf(DropDown.prototype), "constructor", this).call(this, props);
  }

  _createClass(DropDown, [{
    key: "renderMenuItems",
    value: function renderMenuItems() {
      var menulist = this.props.menuitems.map((function (mi) {
        if (mi.options.divider) {
          return React.createElement(MenuItem, { divider: true });
        } else {
          return React.createElement(
            MenuItem,
            { href: mi.path, key: _.uniqueId("menuitem") },
            this.createTitle(mi)
          );
        }
      }).bind(this));
      return menulist;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        DropdownButton,
        { navItem: true, title: this.props.title, key: _.uniqueId(), noCaret: this.props.noCaret },
        this.renderMenuItems()
      );
    }
  }]);

  return DropDown;
})(React.Component);

Object.assign(DropDown.prototype, iconMixins);
Object.assign(DropDown.prototype, navMixins);

module.exports = DropDown;
//# sourceMappingURL=dropdown.js.map