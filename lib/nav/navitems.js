"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

React = require("react/addons");
var _ = require("lodash");

// React-bootstrap: http://react-bootstrap.github.io/
// const bootstrap  = require("react-bootstrap");
var Nav = require("react-bootstrap/lib/Nav");
var NavItem = require("react-bootstrap/lib/NavItem");

var DropDown = require("./dropdown");

var Navitems = (function (_React$Component) {
  _inherits(Navitems, _React$Component);

  function Navitems(props) {
    _classCallCheck(this, Navitems);

    _get(Object.getPrototypeOf(Navitems.prototype), "constructor", this).call(this, props);
  }

  _createClass(Navitems, [{
    key: "createDropdown",
    value: function createDropdown(subnav, title) {
      return React.createElement(DropDown, { menuitems: subnav, title: title, key: _.uniqueId("dropdown") });
    }
  }, {
    key: "createNavItem",
    value: function createNavItem(path, title, selected, n) {
      if (selected === undefined) selected = false;

      // console.log()
      return React.createElement(
        NavItem,
        { eventKey: n, href: path, active: selected, key: _.uniqueId("navitem") },
        title
      );
    }
  }, {
    key: "renderNav",
    value: function renderNav() {
      // let _that = this;
      var navlist = _.map(this.props.items, (function (ni, i) {
        if (_.isUndefined(ni.subnav) || _.isEmpty(ni.subnav)) {
          // console.log("id", ni.data.id)
          return this.createNavItem(ni.path, ni.title, ni.active, i);
        } else {
          return this.createDropdown(ni.subnav, ni.title);
        }
      }).bind(this));

      return navlist;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        Nav,
        { navbar: true, right: true, key: _.uniqueId("nav") },
        this.renderNav()
      );
    }
  }]);

  return Navitems;
})(React.Component);

module.exports = Navitems;
//# sourceMappingURL=navitems.js.map