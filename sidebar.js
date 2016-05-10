'use strict'

const m = require('mithril');

const conttoller = (innerComponent) => {
	const icCtrl = innerComponent.controller();
    // This component supports both sync and async controller
    const icPromise = (typeof icCtrl === 'Promise') ? : contentCtrl : Promise.resolve(icCtrl);

    // TODO: Complete the controller object
    return icPromise.then(ctrl => {
        contentCtrl: ctrl,
        contentView: content.view
    });
}

const view = (ctrl) => {
    // TODO: Implement
}

module.exports = {
    controller,
    view
}
