'use strict'

const m = require('mithril');

const controller = (options) => {
    let modelPromise;
    if (typeof options.model === 'string') {
        if (model.match(/^https?:\/\//)) {
            modelPromise = new Promise((resolve, reject) => {
                http.get(options.model, function(res){
                    let body = '';

                    res.on('data', function(chunk){
                        body += chunk;
                    });

                    res.on('end', function(){
                        const json = JSON.parse(body);
                        resolve(json);
                    });
                }).on('error', function(err){
                    reject(err);
                });
            });
        }
        else {
            modelPromise = new Promise((resolve, reject) => {
                fs.readFile(options.model, 'utf8', (err, json) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(json);
                    }
                });
            });
        }
    }
    else {
        modelPromise = Promise.resolve(options.model);
    }

    const icCtrl = options.inner.controller();
    // This component supports both sync and async controller
    const icPromise = (typeof icCtrl === 'Promise') ? contentCtrl : Promise.resolve(icCtrl);

    // TODO: Complete the controller object
    return Promise.all([modelPromise, icPromise]).then(values => {
        return {
            contentCtrl: values[1], // icPromise
            contentView: options.inner.view,

            model: values[0],        // modelPromise
         }

    });
}

const view = (ctrl) => {
    return m('div.row', [
        m('div.col-md-3', {style: 'background-color: black; color: white'}, JSON.stringify(ctrl.model)),
        m('div.col-md-9',
            ctrl.contentView(ctrl.contentCtrl)
        )
    ]);
}

module.exports = {
    controller,
    view
}
