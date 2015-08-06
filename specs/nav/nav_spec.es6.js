var navmenu;
var React = window.React  = require('react/addons');
const NavDropdown = require("../../src/nav/nav");
const TestUtils   = React.addons.TestUtils;
// const _ = require('lodash')


const jasmineReactHelpers = require("react-jasmine");
const viewportHelper        = jasmineReactHelpers.stubViewportDetection
const componentHelper     = jasmineReactHelpers.componentHelpers;

let spys = [
  {
    fn:function(){
      return (
        <div className="holder">
          <h1 className="navbar-brand" data-navkey={this.props.toggleNavKey}>{this.props.brand}</h1>
          <nav className="nav">{ this.renderChildren() }</nav>
        </div>
      );
    },
    title:"Navbar"
  },
  {
    fn:function(){
      return  (<div className="nav-items">{this.props.navitems.length}</div>);
    },
    title:"Navitems"
  },
  {
    fn:function(){
      return (
        <div className="collapse">
          { this.props.children }
        </div>
      );

    },
    title:"CollapsibleNav"
  }
];

describe('NavDropdown', ()=> {
  let spied = jasmineReactHelpers.spyOnComponents(spys, NavDropdown);
  let spy, store, Viewport, vpSpy;
  viewportHelper.stubViewport(NavDropdown, (sp)=>{
    vpSpy = spy;
    console.log("vp Spy <<<<", vpSpy)
  });



  beforeEach(() => {
    navmenu = TestUtils.renderIntoDocument(<NavDropdown title={"Some title"} navitems={[{title:"nav 1", path:"/"}, {title:"nav 2", path:"/nav2"}]} /> );

    console.log("vpspy", vpSpy)
  });

  it("renders", () => {
    expect(navmenu).toBeTruthy();
  });

  it("should have correct props", ()=> {
    expect(navmenu.props.title).toEqual("Some title");
    expect(navmenu.props.navitems.length).toEqual(2);
  });

  // viewportHelper.stubViewport(()=>{
  //   return {spy:vpSpy};
  // }, ["getDevice", "windowSize", "trackSize"]);


  describe('check render', function() {
    beforeEach(()=>{
      spyOn(navmenu, "link").and.returnValue("Some title");
      navmenu.forceUpdate()
    }, []);

    componentHelper.checkText(()=>{
      let nb =  TestUtils.findRenderedDOMComponentWithClass(navmenu, "navbar-brand");
      return nb.getDOMNode();
    }, "Some title");

    componentHelper.checkText(()=>{
      let ni =  TestUtils.findRenderedDOMComponentWithClass(navmenu, "nav-items");
      return ni.getDOMNode();
    }, "2");
  });


  jasmineReactHelpers.checkSpyWithProps(
      [
        {
          title:"Navbar",
          props:{
            // brand:"Some title",
            toggleNavKey: 0
          }
        },
        {
          title:"Navitems",
          props:{
            navitems:[{title:"nav 1", path:"/"}, {title:"nav 2", path:"/nav2"}],
            device:"desktop"
          }
        }
      ]
      , spied
    );




});
