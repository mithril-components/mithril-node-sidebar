'use strict'

const m = require('mithril');

const conttoller = (options) => {
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
    const icPromise = (typeof icCtrl === 'Promise') ? : contentCtrl : Promise.resolve(icCtrl);

    // TODO: Complete the controller object
    return Promise.all([modelPromise, icPromise]).then(values => {
        model: value[0],        // modelPromise
        contentCtrl: values[1], // icPromise
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
