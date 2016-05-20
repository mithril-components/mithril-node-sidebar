'use strict'

const fs     = require('fs');
const render = require('mithril-node-render')
const sidebar   = require('../mithril_modules/sidebar');

const less = require('less');
const lessfile = fs.readFileSync('less/main.less','UTF-8');

less.render(lessfile, function (e, output) {
    // console.log(output.css);
    fs.writeFileSync('public/main.css', output.css, 'UTF-8');
});

const ctrl = sidebar.controller({
    name: "wpic",
    menulist:[{
        "title":"Discripto",
        "subs":[
            {"title":"discripto-html5","href":"#html5"},
            {"title":"discripto-har","href":"#har"},
            {"title":"discripto-script","href":"#script"}
        ]
    },
    {
        "title":"Discripto2",
        "subs":[]
    }]
});

const view = sidebar.view(ctrl);

const innerHtml = render(view);

const base = fs.readFileSync('public/base.htm', 'UTF-8');
console.log(innerHtml);
fs.writeFileSync('public/sidebar.html', base.replace('%SIDEBAR%', innerHtml), 'UTF-8');
