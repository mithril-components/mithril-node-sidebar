'use strict'

const m = require('mithril');
const menu = require('../menu/menu');

const controller = (data, active) => {  // data is list of menu
    return data.map(d => {
        d.active = active;
        return menu.controller(d);
    });
}

const view = (ctrl) => {
    return ctrl.map(menuCtrl => {
        return m("ul.mc-sidebar-nav.nav.navbar-inverse.nav-stacked", menu.view(menuCtrl))
    });
}

const findNext = (listCtrl) => {
    for(var i in listCtrl) {
       if (listCtrl[i].active) {
           return listCtrl[i].submenu;
       }
    }
    return listCtrl;
}

module.exports = {
    controller: controller,
    view: view,
    findNext: findNext
}