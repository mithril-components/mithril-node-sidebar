'use strict'

const m = require('mithril');
const menu = require('../menu/menu');

const controller = (data) => {  // data is list of menu
    return data.map(d => {
        return menu.controller(d);
    });
}

const view = (ctrl) => {
    return ctrl.map(menuCtrl => {
        return m("ul.sidebar-nav.nav.navbar-inverse.nav-stacked", menu.view(menuCtrl))
    });
}

module.exports = {
    controller: controller,
    view: view
}