"use strict";

var _ = require("lodash");
var Badge = require("react-bootstrap/lib/Badge");

module.exports = {
  constructTitle: function constructTitle(placement, title, icon, badge) {
    var comp = undefined;
    switch (placement) {
      case "only":
        comp = React.createElement(
          "span",
          null,
          icon,
          " ",
          badge
        );
        break;
      case "left":
        comp = React.createElement(
          "span",
          null,
          icon,
          " ",
          React.createElement(
            "span",
            { className: "icon-text" },
            title
          ),
          " ",
          badge
        );
        break;
      case "right":
        comp = React.createElement(
          "span",
          null,
          React.createElement(
            "span",
            { className: "icon-text" },
            title
          ),
          " ",
          icon,
          " ",
          badge
        );
        break;
      default:
        comp = React.createElement(
          "span",
          null,
          React.createElement(
            "span",
            { className: "icon-text" },
            title
          ),
          " ",
          icon,
          " ",
          badge
        );

    }

    return comp;
  },

  createBadge: function createBadge(b) {
    return React.createElement(
      Badge,
      null,
      b
    );
  },

  createIcon: function createIcon(ic) {
    var title = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

    return React.createElement(
      "i",
      { className: "material-icons md-24", title: title },
      ic
    );
  },

  createTitle: function createTitle(item) {
    var device = arguments.length <= 1 || arguments[1] === undefined ? "desktop" : arguments[1];

    var opts = item.options;

    if (opts) {
      var icon = undefined,
          badge = "";
      if (!_.isEmpty(opts.icon)) {
        icon = this.createIcon(opts.icon, item.title);
      }
      if (!_.isUndefined(opts.badge)) {
        badge = this.createBadge(opts.badge);
      }

      var placement = device === "mobile" ? "left" : opts.placement;

      return this.constructTitle(placement, item.title, icon, badge);
    } else {
      return item.title;
    }
  }
};
//# sourceMappingURL=icon_mixins.js.map