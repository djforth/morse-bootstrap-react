const FlashNotice = require("../../src/notices/flash_notices");

const _         = require('lodash');

// Test Helpers
const TestUtils       = React.addons.TestUtils;
// Morse helpers
const jasmineReactHelpers = require("react-jasmine");
const componentHelper     = jasmineReactHelpers.componentHelpers;


let spys = [
  {
    fn:function(){
      return  (<div className="alert">{this.props.children}</div>);
    },
    title:"Alert"
  }
];

describe('FlashNotice', function() {
  let flash_notice, spy;
  let spied   = jasmineReactHelpers.spyOnComponents(spys, FlashNotice);

  let props = {
    type:"notice"
  };

  beforeEach(()=>{

    // revert = DeleteBtn.__set__("AjaxPromises", spy);
    flash_notice = TestUtils.renderIntoDocument(<FlashNotice
      type={props.type}
      >Some Flash Notice</FlashNotice>);
  });

  it("should exist", function() {
    expect(flash_notice).toBeDefined();
  });

  describe('props and state defaults', function() {


    var stateDefaults = {
        alertVisible : ""
      };

    componentHelper.checkPropsAndState(()=>{
      return flash_notice;
    }, props, stateDefaults);
  });

  describe('check stubbed components props', function() {
    jasmineReactHelpers.checkSpyWithProps(
    [
      {
        title:"Alert",
        props:{
          bsStyle:"success"
        }
      }
    ], spied);
  });

  describe('check content', function() {
    jasmineReactHelpers.checkContent(
      "FlashNotice",
      function(){
        return flash_notice;
      },
      [
        {
          title : "Notice",
          css   : "alert",
          result: "Some Flash Notice"
        }
      ]
    );
  });

  describe('setAlert', function() {
    it("should return default if type not recognised", function() {
      flash_notice.props.type = "Phil";
      expect(flash_notice.setAlert()).toEqual("default");
    });

    it("should return success if type notice", function() {
      flash_notice.props.type = "notice";
      expect(flash_notice.setAlert()).toEqual("success");
    });

    it("should return danger if type error", function() {
      flash_notice.props.type = "error";
      expect(flash_notice.setAlert()).toEqual("danger");
    });

    it("should return warn if type alert", function() {
      flash_notice.props.type = "alert";
      expect(flash_notice.setAlert()).toEqual("warning");
    });

    it("should return success if type success", function() {
      flash_notice.props.type = "success";
      expect(flash_notice.setAlert()).toEqual("success");
    });
  });

  describe('componentWillReceiveProps', function() {
    it("should reset state", function() {
      flash_notice.componentWillReceiveProps();
      expect(flash_notice.alertVisible).toEqual([{hide:false}])
      expect(flash_notice.state.alertVisible).toEqual("")
    });
  });

  describe('handleAlertDismiss', function() {
    beforeEach(()=>{
      spyOn(flash_notice, "toggleCss").and.returnValue("foo");
      spyOn(flash_notice, "getClasses").and.returnValue("hide");
      flash_notice.handleAlertDismiss();
    })

    it("should call toggleCss and GetClasses", function() {
      expect(flash_notice.toggleCss).toHaveBeenCalledWith([{hide:false}]);
      expect(flash_notice.getClasses).toHaveBeenCalledWith("foo");
    });

    it("should set variables correctly", function() {
      expect(flash_notice.alertVisible).toEqual("foo");
      expect(flash_notice.state.alertVisible).toEqual("hide");
    });
  });
});
