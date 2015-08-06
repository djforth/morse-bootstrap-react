
const React   = require("react/addons");
const _ = require("lodash");

// React-bootstrap: http://react-bootstrap.github.io/
// const bootstrap  = require("react-bootstrap");
const Nav        = require("react-bootstrap/lib/Nav");
const NavItem    = require("react-bootstrap/lib/NavItem");
const Badge    = require("react-bootstrap/lib/Badge");
const DropDown = require("./dropdown");

//Mixins
const iconMixins  = require("../mixins/icon_mixins");
const navMixins   = require("../mixins/nav_mixins");

class Navitems extends React.Component {
  constructor(props) {
    super(props);
  }

  createDropdown(ni){
    return (<DropDown menuitems={ni.subnav} title={this.createTitle(ni, this.props.device)} noCaret={ni.options.noCaret}  active={this.isSelected(ni.selected)} key={_.uniqueId("dropdown")}></DropDown> );
  }

  createNavItem(ni, n){
    return (<NavItem eventKey={n} href={ni.path} active={this.isSelected(ni.active)} key={_.uniqueId("navitem")}>{this.createTitle(ni, this.props.device)}</NavItem>);
  }

  renderNavItems(items){
    let navlist = _.map(items, function(ni, i){
      if (_.isUndefined(ni.subnav) || _.isEmpty(ni.subnav)) {
        return (this.createNavItem(ni, i));
      } else {
        return (this.createDropdown(ni));
      }
    }.bind(this));

    return navlist;
   }

   renderNav(){
      let navs = [];

      if(this.props.left_nav){
        navs.push(
          <Nav navbar key={_.uniqueId("nav_left")} >
            {this.renderNavItems(this.props.left_nav)}
          </Nav>
        );
      }

      if(this.props.right_nav) {
        navs.push(
          <Nav navbar right key={_.uniqueId("nav_left")} >
            {this.renderNavItems(this.props.right_nav)}
          </Nav>
        );
      }

      if(this.props.navitems) {
        navs.push(
          <Nav navbar right key={_.uniqueId("nav_left")} >
            {this.renderNavItems(this.props.navitems)}
          </Nav>
        );
      }
      return navs;
   }

   render() {
      return (
        <div>
          {this.renderNav()}
        </div>
      );
   }
 }

Object.assign(Navitems.prototype, iconMixins);
Object.assign(Navitems.prototype, navMixins);

module.exports = Navitems;
