import { createElement, render, renderDOm } from './Element';

import diff from './diff';
import patch from './patch';

let vertualDom = createElement('ul',{class:"list"},[
	createElement('li',{class:"item"},['a']),
	createElement('li',{class:"item"},['a']),
	createElement('li',{class:"item"},['a'])
])

let vertualDom2 = createElement('ul',{class:"list-group"},[
	createElement('li',{class:"item"},['w']),
	createElement('li',{class:"item"},['a']),
	createElement('div',{class:"item"},['e'])
])


//将虚拟dom转化成真实dom
let el = render(vertualDom);

//拿到 两棵树的对比结果。即，补丁包。
let patches = diff(vertualDom,vertualDom2);

console.log(patches);

// 拿着补丁包 到真实的dom 上去 更新   ----> 后序
patch(el,patches);



renderDOm(el,window.root);

//domDif


