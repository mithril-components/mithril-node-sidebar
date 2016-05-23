'use strict'

const fs     = require('fs');
const render = require('mithril-node-render')
const menu   = require('../mithril_modules/menu');

const ctrl = menu.controller(
	{
      "title":"Discripto",
      "subs":[
        {"title":"discripto-html5","href":"#html5"},
        {"title":"discripto-har","href":"#har"},
        {"title":"discripto-script","href":"#script"}
      ]
    }
);

const view = menu.view(ctrl);

const innerHtml = render(view);

const base = fs.readFileSync('public/base.htm', 'UTF-8');
console.log(innerHtml);
fs.writeFileSync('public/sidebar.html', base.replace('%SIDEBAR%', innerHtml), 'UTF-8');
