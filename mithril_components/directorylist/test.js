'use strict'

const render = require('mithril-node-render')
const directorylist   = require('./directorylist');


const model =     [ { label: 'Search',
    icon: 'glyphicon glyphicon-search',
    href: '//keyword-staging.wpic-tools.com/search',
    active: false,
    submenuCtrls: [],
    mainActive: false },
  { label: 'History',
    icon: 'glyphicon glyphicon-th-list',
    href: '//keyword-staging.wpic-tools.com/histories',
    active: false,
    submenuCtrls: [],
    mainActive: false } ]

const ctrl = directorylist.controller(model);

const view = directorylist.view(ctrl);

const innerHtml = render(view);

console.log(innerHtml);
