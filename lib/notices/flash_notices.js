//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

React = require("react/addons");

var _ = require("lodash");

var Alert = require("react-bootstrap/lib/Alert");

//Mixins
var cssMixins = require("morse-react-mixins/lib/css_mixins");
// const textMixins = require("../mixins/textMixins.es6.js");

var FlashNotice = (function (_React$Component) {
  _inherits(FlashNotice, _React$Component);

  function FlashNotice(props) {
    _classCallCheck(this, FlashNotice);

    _get(Object.getPrototypeOf(FlashNotice.prototype), "constructor", this).call(this, props);
    this.alertVisible = [{ hide: false }];
    this.state = { alertVisible: "" };
  }

  _createClass(FlashNotice, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      this.alertVisible = [{ hide: false }];
      this.setState({ alertVisible: this.getClasses(this.alertVisible) });
    }
  }, {
    key: "handleAlertDismiss",
    value: function handleAlertDismiss() {
      this.alertVisible = this.toggleCss(this.alertVisible);
      this.setState({ alertVisible: this.getClasses(this.alertVisible) });
    }
  }, {
    key: "setAlert",
    value: function setAlert() {
      var css = "default";
      switch (this.props.type) {
        case "notice":
          css = "success";
          break;
        case "error":
          css = "danger";
          break;
        case "alert":
          css = "warn";
          break;
        case "success":
          css = "success";
          break;
      }

      return css;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { className: this.state.alertVisible },
        React.createElement(
          Alert,
          { bsStyle: this.setAlert(), onDismiss: this.handleAlertDismiss.bind(this) },
          this.props.children
        )
      );
    }
  }]);

  return FlashNotice;
})(React.Component);

Object.assign(FlashNotice.prototype, cssMixins);
// Object.assign(FlashNotice.prototype, textMixins);

module.exports = FlashNotice;
//# sourceMappingURL=flash_notices.js.map