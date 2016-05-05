'use strict'

const m = require('mithril');

const controller = (content) => {
    const contentCtrl = content.controller();
    // This component supports both sync and async controller
    const contentPromise = (typeof contentCtrl === 'Promise') ? : contentCtrl : Promise.resolve(contentCtrl);

    
    return contentPromise.then(ctrl => {
        contentCtrl: ctrl,
        contentView: content.view
    });
}

const view = (ctrl) => {
    return {
        m('p', 'This is added'),
        ctrl.contentView(ctrl.contenCtrl)
    }
}

module.exports = {
    controller: controller,
    view: view
}