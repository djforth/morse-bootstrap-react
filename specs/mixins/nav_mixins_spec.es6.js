
const NavMixins = require("../../src/mixins/nav_mixins");

const _         = require('lodash');

describe('nav_icons', function() {

  it("should set selected to false if nothing is passed", function() {
    expect(NavMixins.isSelected()).toBeFalsy();
  });

  it("should set selected to true if true is passed", function() {
    expect(NavMixins.isSelected(true)).toBeTruthy();
  });

  it("should set selected to false if false is passed", function() {
    expect(NavMixins.isSelected(true)).toBeTruthy();
  });

});