'use strict'

const m = require('mithril');
const menu = require('../menu/menu');

const controller = (data, active) => {  // data is list of menu
    return data.map(d => {
        if(d.href == active){
          d.active = true;
        }else{
          d.active = false;
        }
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