// 对比前后两棵树 之前的差别 返回一个补丁对象 
function diff(oldTree,newTree){

	let patches = {};
	let index = 0;
	walk(oldTree,newTree,index,patches);
	return patches;
}

//对比属性的不同 
function diffAttr(oldAttrs,newAttrs){
	let patch = {}
	//更新 
	for(let attr in oldAttrs){
		if(oldAttrs[attr]!== newAttrs[attr]){
			patch[attr] = newAttrs[attr]
		}
	}
	//新增
	for(let attr in newAttrs){
		if(!oldAttrs.hasOwnProperty(attr)){
			patch[attr] = newAttrs[attr]
		}
	}
	return patch;
}

const ATTRS = "ATTRS";
const TEXT = "TEXT";
const REMOVE = "REMOVE";
const REPLACE = 'REPLACE';
let Index = 0;

//递归遍历子节点的不同 
function diffChildren(oldNode,newNode,index,patches){
	oldNode.forEach((child,idx)=>{
		walk(child ,newNode[idx],++Index,patches)
	})
}

function isString(node){
	return Object.prototype.toString.call(node)=="[object String]";
}


// 具体的对比方法 
function walk(oldNode,newNode,index,patches){
	let currentPatches = []; 

	if(!newNode){ //没有新的节点。删除
		currentPatches.push({type:REMOVE,index});
	}else if(isString(oldNode)&&isString(newNode)){ //判断文本是否变换 
		if(oldNode!==newNode){
			currentPatches.push({type:TEXT,text:newNode});
		}
	}else if(oldNode.type === newNode.type){ //type 相同 判断属性 
		let attrs = diffAttr(oldNode.props,newNode.props);
		if(Object.keys(attrs).length>0){
			currentPatches.push({type:ATTRS,attrs})
		}
		diffChildren(oldNode.children,newNode.children,index,patches)
	}else{
		//节点被替换了 
		currentPatches.push({type:REPLACE,newNode})
	}
	if(currentPatches.length>0){  //产生补丁包 
		patches[index] = currentPatches;
	}
}

export default diff;