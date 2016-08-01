'use strict'

const m = require('mithril');

const controller = (list) => {
    return list;
}

const view = (ctrl) => {
    // console.log(ctrl);
    return m('a', {'href': ctrl.href},
        m('span', {'class':ctrl.icon}),
        m('div.title', ctrl.label)
    );
    
}

module.exports = {
    controller: controller,
    view: view
}