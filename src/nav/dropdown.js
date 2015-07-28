
React   = require("react/addons");
const _ = require("lodash");

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
      return (<MenuItem href={mi.path} key={_.uniqueId("menuitem")}>{mi.title}</MenuItem>);
    });
    return menulist;
  }

  render() {
    return (
        <DropdownButton navItem={true} title={this.props.title} key={_.uniqueId()}>
          {this.renderMenuItems()}
        </DropdownButton>
    );
  }
}

module.exports = DropDown;
