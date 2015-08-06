
const React   = require("react/addons");
const _ = require("lodash");

// React-bootstrap: http://react-bootstrap.github.io/
const Navbar         = require("react-bootstrap/lib/Navbar");
const CollapsibleNav = require("react-bootstrap/lib/CollapsibleNav");

const Navitems = require("./navitems");

// Morse Libraies
const ViewportDetect = require("viewport-detection-es6");

// console.log("WTF<<<<<<<<<<<")

class NavDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {device:"desktop"};
  }

  componentDidMount() {
    const detect = new ViewportDetect();
    let device = detect.getDevice();
    this.size  = detect.windowSize();
    this.setState({
      device:device,
    });
    detect.trackSize(function(device, size){
      if(this.state.device !== device){
        this.setState({
          device:device
        });
      }

      this.size   = size;

    }.bind(this));
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
          <Navitems {...this.props}  key="navitems" device={this.state.device} />
        </CollapsibleNav>
      </Navbar>
    );
  }
}

module.exports = NavDropdown;
