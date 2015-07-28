var navmenu;
var React = window.React  = require('react/addons');
const NavDropdown = require("../../src/nav/nav");
const TestUtils   = React.addons.TestUtils;
// const _ = require('lodash')

const jasmineReactHelpers = require("react-jasmine");

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
      return  (<div className="nav-items">{this.props.items.length}</div>);
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


  beforeEach(() => {
    navmenu = TestUtils.renderIntoDocument(<NavDropdown title={"Some title"} navitems={[{title:"nav 1", path:"/"}, {title:"nav 2", path:"/nav2"}]} /> );
  });

  it("renders", () => {
    expect(navmenu).toBeTruthy();
  });

  it("should have correct props", ()=> {
    expect(navmenu.props.title).toEqual("Some title");
    expect(navmenu.props.navitems.length).toEqual(2);
  });

  jasmineReactHelpers.checkContent(
    "NavDropdown",
    function(){
      return navmenu;
    },
    [
      // {
      //   title : "navbar",
      //   css   : "navbar-brand",
      //   result: "Some title"
      // },
      {
        title : "navitems",
        css   : "nav-items",
        result: "2"
      }
    ]
  );

  jasmineReactHelpers.checkSpyWithProps(
    [
      // {
      //   title:"Navbar",
      //   props:{
      //     brand:"Some title",
      //     toggleNavKey: 0
      //   }
      // },
      {
        title:"Navitems",
        props:{
          items:[{title:"nav 1", path:"/"}, {title:"nav 2", path:"/nav2"}]
        }
      }
    ]
    , spied
  );

});
