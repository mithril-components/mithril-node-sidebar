'use strict'

const render = require('mithril-node-render')
const directory   = require('./directory');

const model = {label: 'Search', icon: 'glyphicon glyphicon-search', href: '//keyword-staging.wpic-tools.com/search', active: false, submenuCtrls: [], mainActive: false }
const ctrl = directory.controller(model);
const view = directory.view(ctrl);
const innerHtml = render(view);

console.log(innerHtml);
