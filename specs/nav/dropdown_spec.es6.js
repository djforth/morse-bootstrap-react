var dropDown;
var React        = window.React  = require('react/addons');
const Dropdown   = require("../../src/nav/dropdown");
const TestUtils  = React.addons.TestUtils;

const jasmineReactHelpers = require("react-jasmine");

let spys = [
  {
    fn:function(){
      return  (<a className="menu-item" href={this.props.path}>{ this.props.children }</a>);
    },
    title:"MenuItem"
  },
  {
    fn:function(){
      return (
        <div  className="dropdown">
          <button className="drop-down">
            {this.props.title}
          </button>
          <nav className="nav">{ this.props.children }</nav>
        </div>
      );

    },
    title:"DropdownButton"
  }
];

let mockdata = [
  {title:"subnav 1", path:"/subnav1"}
];


describe('DropDown', ()=> {
  let spied = jasmineReactHelpers.spyOnComponents(spys, Dropdown);

  beforeEach(() => {
    dropDown = TestUtils.renderIntoDocument(<Dropdown title={"dropdown title"} menuitems={mockdata} /> );
  });

  it("renders", () => {
    expect(dropDown).toBeTruthy();
  });

  it("should have correct props", ()=> {
    expect(dropDown.props.menuitems).toEqual(mockdata);
    expect(dropDown.props.title).toEqual("dropdown title");
  });

  jasmineReactHelpers.checkContent(
    "Dropdown",
    function(){
      return dropDown;
    },
    [
      {
        title : "MenuItem",
        css   : "menu-item",
        result: "subnav 1"
      },
      {
        title : "DropDown",
        css   : "drop-down",
        result: "dropdown title"
      }
    ]
  );

  jasmineReactHelpers.checkSpyWithProps(
    [
      {
        title:"MenuItem",
        props:{
          href: "/subnav1"
        }
      },
      {
        title:"DropdownButton",
        props:{
          navItem:true,
          title: "dropdown title"
        }
      }
    ]
    , spied
  );

});
