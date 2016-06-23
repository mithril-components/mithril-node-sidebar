// TODO: Mitrhil component
'use strict'

const m = require('mithril');
const directory = require('../directory/directory');

const controller = (list) => {
    return list;
}

const view = (ctrl) => {
    // generate the page
    // console.log(ctrl);
    return m('div.col-md-12.mc-sidebar-dir', 
        ctrl.map(directoryCtrl => {
            return directory.view(directoryCtrl);
        })
    )
    
}

module.exports = {
    controller: controller,
    view: view
}