const React = require("react/addons");
const _     = require("lodash");

var FlashNotice = require('./flash_notices');

class MainFlash extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <FlashNotice type={this.props.type}>
        {this.props.message}
      </FlashNotice>
    );
  }
}

module.exports = MainFlash