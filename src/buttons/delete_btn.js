

//Libraries
const React = require("react/addons");

const _  = require("lodash");

//Morse Libraries
const AjaxPromises  = require("ajax-es6-module");

var OverlayTrigger = require("react-bootstrap/lib/OverlayTrigger");
var Tooltip        = require("react-bootstrap/lib/Tooltip");

class DeleteBtn extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.ajaxPromises = new AjaxPromises();
    this.ajaxPromises.addUrl(this.props.delete_api);
    // this.ajaxPromises.getCSRF();
  }

  render(){
    return (
      <OverlayTrigger placement="left" overlay={<Tooltip>{this.props.tooltip}</Tooltip>}>
      <button className="btn btn-danger btn-sm" type="button" onClick={this._onClick.bind(this)} title={this.props.tooltip}><span className="glyphicon glyphicon-trash"></span></button>
      </OverlayTrigger>
    );
  }

  _onClick(e){
    e.preventDefault();

    if (window.confirm(this.props.delete_msg)) {

      this.ajaxPromises.destroy().then((result)=>{
        if(_.isFunction(this.props.callback)){
          this.props.callback(result);
        }

        return result;
      });
    }
  }
}

module.exports = DeleteBtn;
