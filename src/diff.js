function diff(oldTree,newTree){

	let patches = {};
	let index = 0;
	walk(oldTree,newTree,index,patches);
	return patches;
}

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

function walk(oldNode,newTree,index,patches){
	let currentPatches = [];

	if(oldNode.type === newTree.type){
		let attr = diffAttr(oldNode.props,newTree.props);
		console.log(attr);
	}
}

export default diff;