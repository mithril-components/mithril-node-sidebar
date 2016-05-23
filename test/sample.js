'use strict'

const fs     = require('fs');
const render = require('mithril-node-render')
const page   = require('../mithril_modules/sample');

const ctrl = page.controller({
    name: 'Hamed'
});

const view = page.view(ctrl);

const innerHtml = render(view);

const base = fs.readFileSync('public/base.htm', 'UTF-8');
console.log(innerHtml);
fs.writeFileSync('public/sample.html', base.replace('%CONTENT%', innerHtml), 'UTF-8');
