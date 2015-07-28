
React   = require("react/addons");
const _ = require("lodash");

// React-bootstrap: http://react-bootstrap.github.io/
// const bootstrap  = require("react-bootstrap");
const Navbar         = require("react-bootstrap/lib/Navbar");
const CollapsibleNav = require("react-bootstrap/lib/CollapsibleNav");

const Navitems = require("./navitems");

class NavDropdown extends React.Component {
  constructor(props) {
    super(props);
  }

  link() {
    return (
      <a href="/" title="Go to Home">{this.props.title}</a>
    );
  }

  render() {
    return (
       <Navbar brand={this.link()} toggleNavKey={0} inverse  >
        <CollapsibleNav eventKey={0} key={_.uniqueId("collapsed")}>
          <Navitems items={this.props.navitems} key="navitems" />
        </CollapsibleNav>
      </Navbar>
    );
  }
}

module.exports = NavDropdown;
