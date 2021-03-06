"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");
var _ = require("lodash");

// React-bootstrap: http://react-bootstrap.github.io/
// const bootstrap  = require("react-bootstrap");
var Nav = require("react-bootstrap/lib/Nav");
var NavItem = require("react-bootstrap/lib/NavItem");
var Badge = require("react-bootstrap/lib/Badge");
var DropDown = require("./dropdown");

//Mixins
var iconMixins = require("../mixins/icon_mixins");
var navMixins = require("../mixins/nav_mixins");

var Navitems = (function (_React$Component) {
  _inherits(Navitems, _React$Component);

  function Navitems(props) {
    _classCallCheck(this, Navitems);

    _get(Object.getPrototypeOf(Navitems.prototype), "constructor", this).call(this, props);
  }

  _createClass(Navitems, [{
    key: "createDropdown",
    value: function createDropdown(ni) {
      return React.createElement(DropDown, { menuitems: ni.subnav, title: this.createTitle(ni, this.props.device), noCaret: ni.options.noCaret, active: this.isSelected(ni.selected), key: _.uniqueId("dropdown") });
    }
  }, {
    key: "createNavItem",
    value: function createNavItem(ni, n) {
      return React.createElement(
        NavItem,
        { eventKey: n, href: ni.path, active: this.isSelected(ni.active), key: _.uniqueId("navitem") },
        this.createTitle(ni, this.props.device)
      );
    }
  }, {
    key: "renderNavItems",
    value: function renderNavItems(items) {
      var navlist = _.map(items, (function (ni, i) {
        if (_.isUndefined(ni.subnav) || _.isEmpty(ni.subnav)) {
          return this.createNavItem(ni, i);
        } else {
          return this.createDropdown(ni);
        }
      }).bind(this));

      return navlist;
    }
  }, {
    key: "renderNav",
    value: function renderNav() {
      var navs = [];

      if (this.props.left_nav) {
        navs.push(React.createElement(
          Nav,
          { navbar: true, key: _.uniqueId("nav_left") },
          this.renderNavItems(this.props.left_nav)
        ));
      }

      if (this.props.right_nav) {
        navs.push(React.createElement(
          Nav,
          { navbar: true, right: true, key: _.uniqueId("nav_left") },
          this.renderNavItems(this.props.right_nav)
        ));
      }

      if (this.props.navitems) {
        navs.push(React.createElement(
          Nav,
          { navbar: true, right: true, key: _.uniqueId("nav_left") },
          this.renderNavItems(this.props.navitems)
        ));
      }
      return navs;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        this.renderNav()
      );
    }
  }]);

  return Navitems;
})(React.Component);

Object.assign(Navitems.prototype, iconMixins);
Object.assign(Navitems.prototype, navMixins);

module.exports = Navitems;
//# sourceMappingURL=navitems.js.map