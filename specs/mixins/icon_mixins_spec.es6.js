
const IconMixins = require("../../src/mixins/icon_mixins");

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
      return  (<div className="badge">{this.props.children}</div>);
    },
    title:"Badge"
  }
];

describe('icon_mixins', function() {
  let icon_mixin;
  // Mocks sub components
  let spied   = jasmineReactHelpers.spyOnComponents(spys, IconMixins);


  describe('createTitle', function() {
    let item;
    beforeEach(()=>{
      item = {
        options: {
          badge : 1,
          icon  : "foo",
          placement: "only"
        },
        title : "Phil"
      };
      spyOn(IconMixins, "createIcon").and.returnValue("icon");
      spyOn(IconMixins, "createBadge").and.returnValue("badge");
      spyOn(IconMixins, "constructTitle").and.returnValue("Phil was ere");
    })

    describe('Icon is called', function() {
      it("should set icon if icon option", function() {
        let icon = IconMixins.createTitle(item);
        expect(IconMixins.createIcon).toHaveBeenCalledWith("foo","Phil")
      });

      it("should not set icon if no icon option", function() {
        item.options.icon = undefined;
        let icon = IconMixins.createTitle(item);
        expect(IconMixins.createIcon).not.toHaveBeenCalled();
      });
    });

    describe('badge is called', function() {
      it("should set badge if badge option", function() {
        let badge = IconMixins.createTitle(item);
        expect(IconMixins.createBadge).toHaveBeenCalledWith(1);
      });

      it("should not set badge if no badge option", function() {
        item.options.badge = undefined;
        let icon = IconMixins.createTitle(item);
        expect(IconMixins.createBadge).not.toHaveBeenCalled();
      });
    });

    describe('constructTitle', function() {
      it("should call construct title with correct options", function() {
        let icon = IconMixins.createTitle(item);
        expect(IconMixins.constructTitle).toHaveBeenCalled();
        let calls = IconMixins.constructTitle.calls.argsFor(0);
        expect(calls).toContain("icon");
        expect(calls).toContain("badge");
        expect(calls).toContain("only");
        expect(calls).toContain("Phil");
      });

      it("should call set placement to left if mobile", function() {
        let icon = IconMixins.createTitle(item, "mobile");
        expect(IconMixins.constructTitle).toHaveBeenCalled();
        let calls = IconMixins.constructTitle.calls.argsFor(0);

        expect(calls).toContain("left");

      });
    });

  });

  describe('createBadge', function() {
    let badge;
    beforeEach(()=>{
      let b = React.cloneElement(IconMixins.createBadge(2));
      badge = TestUtils.renderIntoDocument(b);
    });

    it("should be defined", function() {
      expect(badge).toBeDefined();
    });

    componentHelper.checkText(()=>{
      return badge.getDOMNode();
    }, "2");
  });

  describe('createIcon', function() {
    let icon;
    beforeEach(()=>{
      let ic = React.cloneElement(IconMixins.createIcon("foo"));
      icon = TestUtils.renderIntoDocument(ic);
      // console.log("icon", icon.getDOMNode());
    });

    it("should be defined", function() {
      expect(icon).toBeDefined();
    });

    componentHelper.checkText(()=>{
      return icon.getDOMNode();
    }, "foo");
  });

  describe('constructTitle', function() {
    let icon, badge, title;
    beforeEach(()=>{
      icon  = (<span className="icon">Icon</span>);
      badge = (<span className="badge">Badge</span>);
    })

    describe("with position only", function(){
      let tc, ic, bd;
      beforeEach(function() {
        let t = React.cloneElement(
          IconMixins.constructTitle("only", "Phil", icon, badge)
        );
        tc = TestUtils.renderIntoDocument(t);
        ic = TestUtils.findRenderedDOMComponentWithClass(tc, "icon");
        bd = TestUtils.findRenderedDOMComponentWithClass(tc, "badge");
      });

      componentHelper.checkText(()=>{
        return ic.getDOMNode();
      }, "Icon");

      componentHelper.checkText(()=>{
        return bd.getDOMNode();
      }, "Badge");

      it("should not contain title ", function() {
        expect(tc.getDOMNode().textContent).not.toMatch("Phil")
      });

    });

    describe("with position left", function(){
      let tc, ic, bd, txt;
      beforeEach(function() {
        let t = React.cloneElement(
          IconMixins.constructTitle("left", "Phil", icon, badge)
        );
        tc = TestUtils.renderIntoDocument(t);
        ic = TestUtils.findRenderedDOMComponentWithClass(tc, "icon");
        bd = TestUtils.findRenderedDOMComponentWithClass(tc, "badge");
        txt = TestUtils.findRenderedDOMComponentWithClass(tc, "icon-text");
      });


      componentHelper.checkText(()=>{
        return ic.getDOMNode();
      }, "Icon");

      componentHelper.checkText(()=>{
        return bd.getDOMNode();
      }, "Badge");

      componentHelper.checkText(()=>{
        return txt.getDOMNode();
      }, "Phil");

      it("should have Icon, text, badge ", function() {
        expect(tc.getDOMNode().textContent).toEqual("Icon Phil Badge")
      });

    });

    describe("with position right", function(){
      let tc, ic, bd, txt;
      beforeEach(function() {
        let t = React.cloneElement(
          IconMixins.constructTitle("right", "Phil", icon, badge)
        );
        tc = TestUtils.renderIntoDocument(t);
        ic = TestUtils.findRenderedDOMComponentWithClass(tc, "icon");
        bd = TestUtils.findRenderedDOMComponentWithClass(tc, "badge");
        txt = TestUtils.findRenderedDOMComponentWithClass(tc, "icon-text");
      });


      componentHelper.checkText(()=>{
        return ic.getDOMNode();
      }, "Icon");

      componentHelper.checkText(()=>{
        return bd.getDOMNode();
      }, "Badge");

      componentHelper.checkText(()=>{
        return txt.getDOMNode();
      }, "Phil");

      it("should have Icon, text, badge ", function() {
        expect(tc.getDOMNode().textContent).toEqual("Phil Icon Badge");
      });

    });

    describe("with unknown position", function(){
      let tc, ic, bd, txt;
      beforeEach(function() {
        let t = React.cloneElement(
          IconMixins.constructTitle("foo", "Phil", icon, badge)
        );
        tc = TestUtils.renderIntoDocument(t);
        ic = TestUtils.findRenderedDOMComponentWithClass(tc, "icon");
        bd = TestUtils.findRenderedDOMComponentWithClass(tc, "badge");
        txt = TestUtils.findRenderedDOMComponentWithClass(tc, "icon-text");
      });


      componentHelper.checkText(()=>{
        return ic.getDOMNode();
      }, "Icon");

      componentHelper.checkText(()=>{
        return bd.getDOMNode();
      }, "Badge");

      componentHelper.checkText(()=>{
        return txt.getDOMNode();
      }, "Phil");

      it("should have Icon, text, badge ", function() {
        expect(tc.getDOMNode().textContent).toEqual("Phil Icon Badge")
      });

    });
  });

});