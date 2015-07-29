

const DeleteBtn = require("./lib/buttons/delete_btn");
const IconBtn   = require("./lib/buttons/icon_btn");

exports.Buttons = {
  Delete : DeleteBtn,
  Icon   : IconBtn
};

const DropDown = require("./lib/nav/dropdown");
const Nav      = require("./lib/nav/nav");
const NavItems = require("./lib/nav/navitems");

exports.NavBar = {
  DropDown : DropDown,
  Nav      : Nav,
  NavItems : NavItems
};

const FlashNotice = require("./lib/notices/flash_notices");

exports.FlashNotice = FlashNotice;

