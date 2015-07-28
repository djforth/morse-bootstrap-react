

//Libraries
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react/addons");

var _ = require("lodash");

//Morse Libraries
var AjaxPromises = require("ajax-es6-module");

var OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");
var Tooltip = require("react-bootstrap/lib/Tooltip");

var DeleteBtn = (function (_React$Component) {
  _inherits(DeleteBtn, _React$Component);

  function DeleteBtn(props) {
    _classCallCheck(this, DeleteBtn);

    _get(Object.getPrototypeOf(DeleteBtn.prototype), "constructor", this).call(this, props);
  }

  _createClass(DeleteBtn, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.ajaxPromises = new AjaxPromises();
      this.ajaxPromises.addUrl(this.props.delete_api);
      // this.ajaxPromises.getCSRF();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        OverlayTrigger,
        { placement: "left", overlay: React.createElement(
            Tooltip,
            null,
            this.props.tooltip
          ) },
        React.createElement(
          "button",
          { className: "btn btn-danger btn-sm", type: "button", onClick: this._onClick.bind(this), title: this.props.tooltip },
          React.createElement("span", { className: "glyphicon glyphicon-trash" })
        )
      );
    }
  }, {
    key: "_onClick",
    value: function _onClick(e) {
      var _this = this;

      e.preventDefault();

      if (window.confirm(this.props.delete_msg)) {

        this.ajaxPromises.destroy().then(function (result) {
          if (_.isFunction(_this.props.callback)) {
            _this.props.callback(result);
          }

          return result;
        });
      }
    }
  }]);

  return DeleteBtn;
})(React.Component);

module.exports = DeleteBtn;
//# sourceMappingURL=delete_btn.js.map