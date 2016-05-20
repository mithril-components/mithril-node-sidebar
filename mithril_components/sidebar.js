'use strict'

const m = require('mithril');
const menulist = require('./menulist');

const controller = (data) => { // {title, menulist}
    return {
        name: data.name,
        menutListCtrl: menulist.controller(data.menulist)
    }
}

const view = (ctrl) => {
    return m('ul.sidebar-nav',[
        // m('p', ctrl.name),
        menulist.view(ctrl.menutListCtrl)
    ]);
}

module.exports = {
    controller: controller,
    view: view
}


