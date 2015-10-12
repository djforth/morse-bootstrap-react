//Libraries
const React   = require("react/addons");

const _ = require("lodash");

const Alert = require("react-bootstrap/lib/Alert");

//Mixins
const cssMixins  = require("morse-react-mixins/lib/css_mixins");
// const textMixins = require("../mixins/textMixins.es6.js");

class FlashNotice extends React.Component {

  constructor(props) {
    super(props);
    this.alertVisible = [{hide:false}];
    this.state = {alertVisible:""};
  }

  componentWillReceiveProps(nextProps){
    this.alertVisible = [{hide:false}];
    this.setState({alertVisible:this.getClasses(this.alertVisible)});
  }

  handleAlertDismiss() {
    this.alertVisible = this.toggleCss(this.alertVisible);
    this.setState({alertVisible:this.getClasses(this.alertVisible)});
  }

  setAlert(){
    let css = "default";
    switch(this.props.type){
      case "notice":
        css = "success";
      break;
      case "error":
        css = "danger";
      break;
      case "alert":
        css = "warning";
      break;
      case "success":
        css = "success";
      break;
    }

    return css;
  }

  render(){
    return (
      <div className={this.state.alertVisible}>
        <Alert bsStyle={this.setAlert()}  onDismiss={this.handleAlertDismiss.bind(this)}>
          {this.props.children}
        </Alert>
      </div>
    );
  }
}

Object.assign(FlashNotice.prototype, cssMixins);
// Object.assign(FlashNotice.prototype, textMixins);

module.exports = FlashNotice;
