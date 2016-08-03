// TODO: Mitrhil component
'use strict'

const m = require('mithril');
const directory = require('../directory/directory');

const controller = (list) => {
    return list;
}

const view = (ctrl) => {
    // generate the page
    // console.log(ctrl.length);
    return m('div.col-md-12.mc-sidebar-dir',
        m('div.row',
            m('div.col-lg-2.hidden-xs',''),
            m('div.col-lg-8.col-xs-12',
                ctrl.map(directoryCtrl => {
                    var n = Math.floor(12/ Math.ceil(Math.sqrt(ctrl.length)));
                    // console.log(n);
                    return m('div.col-md-'+ n + '.col-xs-6.menuicon.text-center',
                        directory.view(directoryCtrl)
                    )
                })
            ),
            m('div.col-lg-2.hidden-xs','')
        )
        
    )
    
}

module.exports = {
    controller: controller,
    view: view
}