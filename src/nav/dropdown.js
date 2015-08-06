
const React   = require("react/addons");
const _ = require("lodash");


const iconMixins = require("../mixins/icon_mixins");
const navMixins  = require("../mixins/nav_mixins");

// React-bootstrap: http://react-bootstrap.github.io/
// const bootstrap  = require("react-bootstrap");
let DropdownButton = require("react-bootstrap/lib/DropdownButton");
let MenuItem       = require("react-bootstrap/lib/MenuItem");

class DropDown extends React.Component {
  constructor(props) {
    super(props);
  }

  renderMenuItems(){
    let menulist = this.props.menuitems.map(function(mi){
      if(mi.options.divider){
        return (<MenuItem divider/>);
      } else {
        return (<MenuItem href={mi.path} key={_.uniqueId("menuitem")}>{this.createTitle(mi)}</MenuItem>);
      }

    }.bind(this));
    return menulist;
  }

  render() {
    return (
        <DropdownButton navItem={true} title={this.props.title} key={_.uniqueId()} noCaret={this.props.noCaret}>
          {this.renderMenuItems()}
        </DropdownButton>
    );
  }
}

Object.assign(DropDown.prototype, iconMixins);
Object.assign(DropDown.prototype, navMixins);

module.exports = DropDown;
