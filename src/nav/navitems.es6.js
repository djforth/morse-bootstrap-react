
React   = require("react/addons");
const _ = require("lodash");

// React-bootstrap: http://react-bootstrap.github.io/
// const bootstrap  = require("react-bootstrap");
const Nav        = require("react-bootstrap/lib/Nav");
const NavItem    = require("react-bootstrap/lib/NavItem");

const DropDown = require("./dropdown.es6.js");

const Navitems = React.createClass({
  createDropdown(subnav, title){
    return (<DropDown menuitems={subnav} title={title} key={_.uniqueId("dropdown")}></DropDown> );
  },

  createNavItem (path, title, n){
    // console.log()
    return (<NavItem eventKey={n} href={path} key={_.uniqueId("navitem")}>{title}</NavItem>);
  },



  renderNav(){
     // let _that = this;
     let navlist = _.map(this.props.items, function(ni, i){
      if (_.isUndefined(ni.subnav) || _.isEmpty(ni.subnav)) {
        // console.log("id", ni.data.id)
        return (this.createNavItem(ni.path, ni.title, i));
      } else {
        return (this.createDropdown(ni.subnav, ni.title) );
      }
    }.bind(this));

    return navlist;
   },

   render() {
      return (
        <Nav navbar right key={_.uniqueId("nav")} >
          {this.renderNav()}
        </Nav>
      );
   }
 });

module.exports = Navitems;
