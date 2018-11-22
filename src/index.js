import { createElement, render, renderDOm } from './Element';

import diff from './diff';

let vertualDom = createElement('ul',{class:"list"},[
	createElement('li',{class:"item"},['a']),
	createElement('li',{class:"item"},['a']),
	createElement('li',{class:"item"},['a'])
])

let vertualDom2 = createElement('ul',{class:"list-group"},[
	createElement('li',{class:"item"},['1']),
	createElement('li',{class:"item"},['a']),
	createElement('li',{class:"item"},['3'])
])

let patches = diff(vertualDom,vertualDom2);
//将虚拟dom转化成真实dom
let el = render(vertualDom);


renderDOm(el,window.root);



//domDiff 三种优化策略
//


