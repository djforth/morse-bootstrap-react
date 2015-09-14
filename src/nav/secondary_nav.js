const React = require("react/addons");
const _     = require("lodash");

// Morse Libraies
const ViewportDetect = require("viewport-detection-es6");

// React-bootstrap: http://react-bootstrap.github.io/
// const bootstrap  = require("react-bootstrap");
const Nav      = require("react-bootstrap/lib/Nav");
const NavItem  = require("react-bootstrap/lib/NavItem");
const Badge    = require("react-bootstrap/lib/Badge");
// const IconBtn  = require("morse-bootstrap-react").Material.Icon;


const iconMixins = require("../mixins/icon_mixins");
const navMixins  = require("../mixins/nav_mixins");
const cssMixins  = require("morse-react-mixins").css_mixins;

class Subnav extends React.Component {
  constructor(props) {
    super(props);
    // this.navShow = [ "navbar-collapse", "collapse", {in:false}];
    this.btnShow = [{hide:true}, "navbar-header"];
    this.state   = {device:"desktop", navShow:true, btnShow:this.getClasses(this.btnShow) };
  }



  componentDidMount() {
    const detect = new ViewportDetect();
    let device = detect.getDevice();
    this.setButton(device);

    this.setState({
      device:device
    });
    detect.trackSize((device, size)=>{
      if(this.state.device !== device){
        this.setButton(device);
      }

      this.size   = size;

    });
  }

  createNavItem (ni, n){
    return (<NavItem eventKey={n} href={ni.path} active={this.isSelected(ni.active)} key={_.uniqueId("navitem")}>{this.createTitle(ni)}</NavItem>);
  }

  renderNav(){
    let navlist = _.map(this.props.items, (ni, i)=>{
      return this.createNavItem(ni, i);
    });

    return navlist;
  }

  render() {
    return (
      <div className="clearfix">
        <div className={this.state.btnShow} >
          <button className="navbar-toggle" onClick={this._onClick.bind(this)}>
            <i className="material-icons md-24">more_vert</i>
          </button>
        </div>
        <Nav bsStyle='tabs' justified expanded={this.state.navShow} >
          {this.renderNav()}
        </Nav>
      </div>
    );
  }

  setButton(device){
    let state = _.clone(this.state);
        this.btnShow  = [{hide:(device !== "mobile")}, "navbar-header"];
        state.btnShow = this.getClasses(this.btnShow);
        state.device  = device;
        state.navShow = (device !== "mobile");
        this.setState(state);
  }

  _onClick(e){
    e.preventDefault();
    this.setState({navShow:!this.state.navShow});

  }
}

Object.assign(Subnav.prototype, iconMixins);
Object.assign(Subnav.prototype, navMixins);
Object.assign(Subnav.prototype, cssMixins);

module.exports = Subnav;
