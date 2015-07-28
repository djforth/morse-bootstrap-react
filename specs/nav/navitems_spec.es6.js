var navItems;
var React        = window.React  = require('react/addons');
const Navitems   = require("../../javascripts/components/react-bootstrap/navitems.es6.js");
const TestUtils  = React.addons.TestUtils;

const jasmineReactHelpers = require("../../../utils/jasmineReactHelpers.es6.js");

let spys = [
  {
    fn:function(){
      return  (<a className="nav-item" href={this.props.path}>{ this.props.children }</a>);
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

let mockdata = [{title:"nav 1", path:"/"}, {title:"nav 2", path:"/nav2", subnav:[{title:"subnav 1", path:"/subnav1"}, {title:"subnav 2", path:"/subnav2"}]}];


describe('Navitems', ()=> {
  let spied = jasmineReactHelpers.spyOnComponents(spys, Navitems);


  beforeEach(() => {
    navItems = TestUtils.renderIntoDocument(<Navitems items={mockdata} /> );
  });

  it("renders", () => {
    expect(navItems).toBeTruthy();
  });

  it("should have correct props", ()=> {
    expect(navItems.props.items).toEqual(mockdata);
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
          eventKey:0,
          href: "/"
        }
      },
      {
        title:"DropDown",
        props:{
          menuitems:mockdata[1].subnav,
          title: "nav 2"
        }
      }
    ]
    , spied
  );
});

