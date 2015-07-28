const DeleteBtn = require("../../src/buttons/delete_btn");
const React = require("react/addons");
// const Immutable = require('immutable');
const _         = require('lodash');

// Test Helpers
const TestUtils       = React.addons.TestUtils;
// Morse helpers
const jasmineReactHelpers = require("react-jasmine");
const componentHelper     = jasmineReactHelpers.componentHelpers;

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

describe('delete_btn', function() {
  let delete_btn, spy, AjaxPromises, store, promise, resolve, reject, callback;
  let spied   = jasmineReactHelpers.spyOnComponents(spys, DeleteBtn);

  let props = {
    tooltip    : "Delete Phil Collins",
    delete_msg : "Are you sure you want to delete Phil Collins?",
    delete_api : "/contact/1",
    id         : 1
  };

  beforeEach(()=>{
    spy = jasmine.createSpyObj("ajaxPromises", ["addUrl", "getCSRF", "destroy"]);
    callback = jasmine.createSpy("callback");
    promise = new Promise((res, rej)=>{
      resolve = res;
      reject  = rej;
    });

    spy.destroy.and.returnValue(promise);

    AjaxPromises = DeleteBtn.__get__("AjaxPromises");
    store = {
        addUrl:AjaxPromises.prototype.addUrl,
        destroy: AjaxPromises.prototype.destroy
      };

    Object.assign(AjaxPromises.prototype, spy);
    // revert = DeleteBtn.__set__("AjaxPromises", spy);
    delete_btn = TestUtils.renderIntoDocument(<DeleteBtn
      tooltip    = {props.tooltip}
      callback   = {callback}
      delete_msg = {props.delete_msg}
      delete_api = {props.delete_api}
      id         = {props.id}
      /> );
  });

  afterEach(function(){
    Object.assign(AjaxPromises.prototype, store);
  });

  describe('props defaults', function() {

    componentHelper.checkProps(()=>{
      return delete_btn;
    }, props);
  });

  describe('check mocked components', ()=> {

    jasmineReactHelpers.checkSpyWithProps(
    [
      {
        title:"OverlayTrigger",
        props:{
          placement    : "left"
        }
      }
    ], spied);


  });


  describe('the ajaxPromises should be set up', function() {
    it("should set addURL on mounting", function() {
      expect(spy.addUrl).toHaveBeenCalledWith(props.delete_api);
    });
  });

  describe('_onClick', function() {
    let clickSpy;
    beforeEach(()=>{
      spyOn(window, "confirm").and.returnValue(true);
      clickSpy = jasmine.createSpyObj("e", ["preventDefault"]);
      delete_btn._onClick(clickSpy);
    })
    it("should call preventDefault", function() {
      expect(clickSpy.preventDefault).toHaveBeenCalled();
    });

    it("should call window.confirm", function() {
      expect(window.confirm).toHaveBeenCalledWith(props.delete_msg);
    });

    it("should call destroy _onClick", function() {
      expect(spy.destroy).toHaveBeenCalled();
    });

    it("callback called when promise resolved ", function(done) {
      promise.then((result)=>{
        expect(callback).toHaveBeenCalledWith("success")
      });

      resolve("success");

      setTimeout(function() {
        done();
      }, 100);
    });
  });

  describe('check click event', function() {
    componentHelper.checkEvent(
      ()=>{
        return delete_btn;
      },
      {type:"tag", identifier:"button"},
      "_onClick",
      "click"
    );
  });

  describe('check render', function() {
    describe('check a link render ok', function() {
      componentHelper.checkRender(
        ()=>{
          return delete_btn;
        },
        {type:"tag", tag:"button"},
        {
          attributes:[
            {key:"class", value:"btn btn-danger btn-sm"},
            {key:"title", value:props.tooltip},
            {key:"type" , value:"button"},
          ]
        }
      );
    });

    describe('check Icon rendered ok', function() {
      componentHelper.checkRender(
        ()=>{
          return delete_btn;
        },
        {type:"tag", tag:"span"},
        {
          attributes:[
            {key:"class", value:"glyphicon glyphicon-trash"}
          ]
        }
      );
    });
  });

});


