const _     = require("lodash");
const Badge = require("react-bootstrap/lib/Badge");

module.exports = {
  constructTitle(placement, title, icon, badge){
    let comp;
    switch(placement){
      case "only":
        comp = (<span>{icon} {badge}</span>);
        break;
      case "left":
        comp = (<span>{icon} <span className="icon-text">{title}</span> {badge}</span>);
        break;
      case "right":
        comp = (<span><span className="icon-text">{title}</span> {icon} {badge}</span>);
        break;
      default:
        comp = (<span><span className="icon-text">{title}</span> {icon} {badge}</span>);

    }

    return comp;

  },

  createBadge(b){
    return (<Badge>{b}</Badge>);
  },

  createIcon(ic, title=""){
    return (<i className="material-icons md-24" title={title}>{ic}</i>);
  },

  createTitle(item, device="desktop"){
    let opts = item.options;

    if(opts){
      let icon, badge = "";
      if(!_.isEmpty(opts.icon)){
        icon = this.createIcon(opts.icon, item.title);
      }
      if(!_.isUndefined(opts.badge)){
        badge = this.createBadge(opts.badge);
      }

      let placement = (device === "mobile") ? "left" : opts.placement;

      return this.constructTitle(placement, item.title, icon, badge);
    } else {
      return item.title;
    }

  }
};
