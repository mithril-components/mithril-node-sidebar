// TODO: Mitrhil component
'use strict'

const m = require('mithril');

const controller = (list) => {
    return list;
}

const view = (ctrl) => {
    // generate the page
    console.log(ctrl);
    return m('div.col-md-4',
        m('a', {'href': ctrl.href},
            m('span', {'class':ctrl.icon}),
            m('div.title', ctrl.label)
        )
    )
}

module.exports = {
    controller: controller,
    view: view
}