const MainFlash = require("../../src/notices/main_flash");

const _         = require('lodash');

// Test Helpers
const TestUtils       = React.addons.TestUtils;
// Morse helpers
const jasmineReactHelpers = require("react-jasmine");
const componentHelper     = jasmineReactHelpers.componentHelpers;


let spys = [
  {
    fn:function(){
      return  (<div className={this.props.type}>{this.props.children}</div>);
    },
    title:"FlashNotice"
  }
];

describe('FlashNotice', function() {
  let flash_notice, spy;
  let spied   = jasmineReactHelpers.spyOnComponents(spys, MainFlash);

  let props = {
    type:"notice",
    message: "Test"
  };

  beforeEach(()=>{
    flash_notice = TestUtils.renderIntoDocument(<MainFlash
      type={props.type} message={props.message} />);
  });

  it("should exist", function() {
    expect(flash_notice).toBeDefined();
  });

  describe('props and state defaults', function() {
    componentHelper.checkProps(()=>{
      return flash_notice;
    }, props);
  });

  describe('check stubbed components props', function() {
    jasmineReactHelpers.checkSpyWithProps(
    [
      {
        title:"FlashNotice",
        props:{
          type:"notice"
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
          css   : "notice",
          result: "Test"
        }
      ]
    );
  });

});