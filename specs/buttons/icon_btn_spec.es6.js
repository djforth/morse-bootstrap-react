const IconBtn = require("../../src/buttons/icon_btn");
const React = require("react/addons");
// const Immutable = require('immutable');
const _         = require('lodash');

// Test Helpers
const TestUtils       = React.addons.TestUtils;
// Morse helpers
const jasmineReactHelpers = require("react-jasmine");
const componentHelper     = jasmineReactHelpers.componentHelpers;

// Sets up for helper to mock sub components
let spys = [
  {
    fn:function(){
      return  (<div className="overlay">{this.props.children}</div>);
    },
    title:"OverlayTrigger"
  },
  {
    fn:function(){
      return  (<div className="tooltip">{this.props.children}</div>);
    },
    title:"Tooltip"
  }
];

describe('IconBtn', function() {
  let icon_btn;
  // Mocks sub components
  let spied   = jasmineReactHelpers.spyOnComponents(spys, IconBtn);

  let props = {
    icon    : "phil",
    options : {placement:"top", button_type:"foo", additional_css:"whatever"},
    path    : "http://google.co.uk",
    title   : "Phil Collins Day"
  };

  beforeEach(()=>{

    icon_btn = TestUtils.renderIntoDocument(<IconBtn
      icon    = {props.icon}
      options = {props.options}
      path    = {props.path}
      title   = {props.title}
      /> );

  });

  // Slightly Irrelevent but tests it renders ok
  it("should exist", ()=>{
    expect(icon_btn).toBeDefined();
  });

  //Checks that state & props are being set correctly
  describe('props defaults', function() {
    let state = {
      placement : "top",
      btn       : "btn btn-foo whatever",
      icon      : "glyphicon phil"
    }
    // Notice  return function with component
    componentHelper.checkPropsAndState(()=>{
      return icon_btn;
    }, props, state);
  });

  describe('check mocked components', ()=> {
    // Checks props are passed to component correctly
    jasmineReactHelpers.checkSpyWithProps(
    [
      {
        title:"OverlayTrigger",
        props:{
          placement    : "top"
        }
      }
    ], spied);
  });


  describe('check css setting', function() {
    beforeEach(()=>{
      //Tear down to make sure always correct
      icon_btn.btn_css  = ["btn"];
      icon_btn.icon_css = ["glyphicon"];
    });

    describe("setBtnStyle", ()=>{
      // If nothing is set
      it("should return default styles if not set", function() {
        let css = icon_btn.setBtnStyle();
        // Check btn.css has been added to correctly
        expect(icon_btn.btn_css).toContain("btn-default");
        // Check nothing adding on additional
        expect(icon_btn.btn_css.length).toEqual(2);

        //check return is correct
        expect(css).toEqual("btn btn-default");
      });

      // If type is set
      it("should return btn style if type is set", function() {
        let css = icon_btn.setBtnStyle("edit");
        // Check btn.css has been added to correctly
        expect(icon_btn.btn_css).toContain("btn-edit");
        // Check nothing adding on additional
        expect(icon_btn.btn_css.length).toEqual(2);

        //check return is correct
        expect(css).toEqual("btn btn-edit");
      });

      // If additonal is set
      it("should return btn style if additional is set", function() {
        let css = icon_btn.setBtnStyle(null, "foo");
        // Check btn.css has been added to correctly
        expect(icon_btn.btn_css).toContain("btn-default");
        // Check nothing adding on additional
        expect(icon_btn.btn_css.length).toEqual(3);

        //check return is correct
        expect(css).toEqual("btn btn-default foo");
      });

    });

    describe("setIconStyle", ()=>{
      // If nothing is set
      it("should return default styles if not set", function() {
        let css = icon_btn.setIconStyle();
        // Check btn.css has been added to correctly
        expect(icon_btn.icon_css).toContain("glyphicon-edit");
        //check return is correct
        expect(css).toEqual("glyphicon glyphicon-edit");
      });

      // If type is set
      it("should return icon style if type is set", function() {
        let css = icon_btn.setIconStyle("foo");
        // Check btn.css has been added to correctly
        expect(icon_btn.icon_css).toContain("foo");

        //check return is correct
        expect(css).toEqual("glyphicon foo");
      });
    });

    describe('css styles & placement is set when componentDidMount', function() {
      beforeEach(()=>{
        // Makes sure state is reset for test
        icon_btn.state = {
          placement : "top",
          btn       : "btn",
          icon      : "glyphicon"
        }

        //Stub out btn and icon functions
        spyOn(icon_btn, "setBtnStyle").and.returnValue("foo");
        spyOn(icon_btn, "setIconStyle").and.returnValue("bar");
        // Stub out setState
        spyOn(icon_btn, "setState");
      });

      it("should set css states correctly", function() {
        // Set props for test
        icon_btn.props = {
          icon    : "easylover",
          options : {placement:null, button_type:"collins", additional_css:"phil"}
        }
        icon_btn.componentDidMount();
        // checks setBtnStyle called correctly
        expect(icon_btn.setBtnStyle).toHaveBeenCalledWith("collins", "phil");

        // checks setIconStyle called correctly
        expect(icon_btn.setIconStyle).toHaveBeenCalledWith("easylover");

        //Check setState called correctly
        expect(icon_btn.setState).toHaveBeenCalled();
        //Because complex easier test
        let calls = _.first(icon_btn.setState.calls.argsFor(0));
        expect(calls.btn).toEqual("foo");
        expect(calls.icon).toEqual("bar");
      });

      it("should set default placement", function() {
        // Set props for test
        icon_btn.props = {
          icon    : "phil",
          options : {placement:null, button_type:"foo", additional_css:"whatever"}
        }
        icon_btn.componentDidMount();
        //Check placement on setState call
        let calls = _.first(icon_btn.setState.calls.argsFor(0));
        expect(calls.placement).toEqual("top");
      });

      it("should set new placement", function() {
        // Set props for test
        icon_btn.props = {
          icon    : "phil",
          options : {placement:"left", button_type:"foo", additional_css:"whatever"}
        }
        icon_btn.componentDidMount();
        //Check placement on setState call
        let calls = _.first(icon_btn.setState.calls.argsFor(0));
        expect(calls.placement).toEqual("left");
      });
    });
  });

  describe('test tooltip', function() {
    let tooltip;
    beforeEach(()=>{
      let tt = React.cloneElement(icon_btn.tooltip());
      tooltip = TestUtils.renderIntoDocument(tt);
      // console.log("tooltip", tooltip.getDOMNode())
    });

    it("should be defined", function() {
      expect(tooltip).toBeDefined();
    });

    componentHelper.checkText(()=>{
      return tooltip.getDOMNode();
    }, "Phil Collins Day");


  });

  describe('check render', function() {
    describe('check a link render ok', function() {
      componentHelper.checkRender(
        ()=>{
          return icon_btn;
        },
        {type:"tag", tag:"a"},
        {
          attributes:[
            {key:"class", value:"btn btn-foo whatever"},
            {key:"href", value:"http://google.co.uk"}
          ]
        }
      );
    });

    describe('check Icon rendered ok', function() {
      componentHelper.checkRender(
        ()=>{
          return icon_btn;
        },
        {type:"tag", tag:"span"},
        {
          attributes:[
            {key:"class", value:"phil"}
          ]
        }
      );
    });
  });
});