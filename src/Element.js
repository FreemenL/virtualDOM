//根据传进来的值 产生虚拟dom 对象

class Element{
	constructor(type,props,children){
		this.type = type;
		this.props = props;
		this.children = children;
	}
}

//设置属性
function setAttr(node,key,value){
	switch(key){
		case"value":
			if(node.tagName.toUpperCase()==="INPUT"||
				node.tagName.toUpperCase()==="TEXTAREA"){
				node.value = value
			}else{
				node.setAttribute(key,value);
			}
			break;
		case"style":
			node.style.cssText = value;
		   break;
		default:
			node.setAttribute(key,value);
		   break;

	}
}

//生成虚拟dom 
function createElement(type,props,children){

	return new Element(type,props,children)

}

//负责将虚拟dom处理成真实的dom
function render(eleObj){
	let el  = document.createElement(eleObj.type);
	for(let key in eleObj.props){
		//设置属性的方法
		setAttr(el,key,eleObj.props[key]);
	}
	eleObj.children.forEach((child)=>{
		child = (child instanceof Element)?render(child):document.createTextNode(child);
		el.appendChild(child)
	})
	return el;
}

//把dom挂在到页面中
function renderDOm(el,target){
	target.appendChild(el);
}

export { 
	setAttr,
	renderDOm,
	Element,
	createElement,
	render
}


