var navItems;
var React        = window.React  = require('react/addons');
const Navitems   = require("../../src/nav/navitems");
const TestUtils  = React.addons.TestUtils;

const jasmineReactHelpers = require("react-jasmine");
const componentHelpers    = jasmineReactHelpers.componentHelpers
let spys = [
  {
    fn:function(){
      return  (<ul className="nav-bar" >{ this.props.children }</ul>);
    },
    title:"Nav"
  },
  {
    fn:function(){
      return  (<a className={`nav-item ${this.props.active}`} href={this.props.path}>{ this.props.children }</a>);
    },
    title:"NavItem"
  },
  {
    fn:function(){
      return (
        <div className="drop-down">
          <h2 className="title">{this.props.title}</h2>
          <p className="menuitems">{this.props.menuitems.length}</p>
        </div>
      );

    },
    title:"DropDown"
  }
];

let mockdata = [
  {title:"nav 1", selected:false, path:"/", options:{divider:false, icon:"", placement:"left", noCaret:false}
  },
  {title:"nav 2", selected:false,
   subnav:[
      {title:"subnav 1", path:"/subnav1"},
      {title:"subnav 2", path:"/subnav2"}
    ],
    options:{divider:false, icon:"", placement:"left", noCaret:false}
  }
];

describe('Navitems', ()=> {
  let spied = jasmineReactHelpers.spyOnComponents(spys, Navitems);


  beforeEach(() => {
    navItems = TestUtils.renderIntoDocument(<Navitems navitems={mockdata} /> );
    spyOn(navItems, "createTitle").and.callFake((t)=>{
      return t.title
    });

    navItems.forceUpdate();
  });

  it("renders", () => {
    expect(navItems).toBeTruthy();
  });

  it("should have correct props", ()=> {
    expect(navItems.props.navitems).toEqual(mockdata);
  });

  jasmineReactHelpers.checkContent(
    "Navitems",
    function(){
      return navItems;
    },
    [
      {
        title : "NavItem",
        css   : "nav-item",
        result: "nav 1"
      },
      {
        title : "DropDown",
        css   : "title",
        result: "nav 2"
      },
      {
        title : "DropDown",
        css   : "menuitems",
        result: "2"
      }
    ]
  );

  jasmineReactHelpers.checkSpyWithProps(
    [
      {
        title:"NavItem",
        props:{
          active:false,
          eventKey:0,
          href: "/"
        }
      },
      {
        title:"DropDown",
        props:{
          active:false,
          menuitems:mockdata[1].subnav
        }
      }
    ]
    , spied
  );

  // describe('createNavItem', function() {
  //   let ni;
  //   beforeEach(()=>{
  //     console.log('test', navItems.createNavItem );
  //     spyOn(navItems, "createNavItem").and.returnValue("active")
  //     ni = componentHelpers.checkSubRender(navItems.createNavItem, mockdata[0]);
  //   });

  //   it("should exist", function() {
  //     expect(ni).toBeDefined();
  //     let t = TestUtils.findRenderedDOMComponentWithClass(ni, "nav-items")
  //     console.log("ni", t.getDOMNode())
  //   });
  // });

});

