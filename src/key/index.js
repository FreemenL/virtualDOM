/**
 * 在 dom diff 中如何识别和处理 key 
*/
const REMOVE = "REMOVE";
const INSERT = "INSERT";


class Element{
    constructor(tagName,key,children){
        this.tagName = tagName;
        this.key = key;
        this.children = children;
    }
    render(){
        let element = document.createElement(this.tagName);
        element.innerHTML = this.children;
        element.setAttribute("key",this.key);
        return element;
    }
}

function el(tagName,key,children){
    return new Element(tagName,key,children);
}

let oldChildren = [
    el("li","A","A"),
    el("li","B","B"),
    el("li","C","C"),
    el("li","D","D")
];
let ul = document.createElement("ul");
oldChildren.forEach(item=> ul.appendChild(item.render()));
document.body.appendChild(ul);

let newChildren = [
    el("li","A","A"),
    el("li","C","C"),
    el("li","B","B"),
    el("li","D","D"),
];

let patches = diff(oldChildren,newChildren);
console.log(patches)//[{ type: REMOVE,index:0},{type:INSERT,index,node}]
patch(ul,patches);
function patch(root,patches){
    let oldNode;
    let oldNodeMap = {};
    Array.from(root.childNodes).forEach(node=>{
        oldNodeMap[node.getAttribute("key")] = node  
    });
    patches.forEach(patch=>{
        switch(patch.type){
            case INSERT:
                let newNode;
                if(oldNodeMap[patch.node.key]){
                    newNode = oldNodeMap[patch.node.key];
                    delete oldNodeMap[patch.node.key];
                }else{
                    newNode = patch.node.render();
                }
                oldNode = root.childNodes[patch.index];
                if(oldNode){
                    root.insertBefore(newNode,oldNode);
                }else{
                    root.appendChild(newNode);
                }
                break;
            case REMOVE:
                oldNode = root.childNodes[patch.index];
                root.removeChild(oldNode);
                break;
            default:
                throw new Error("没有这种布丁类型！");
        }
    })
}
function diff(oldChildren,newChildren){
    
    let patches = [];
    let newKeys = newChildren.map(item=>item.key);
    // 第一步，把老数组中在新数组中没有的元素移除掉
    let oldIndex = 0;
    let newLength = newChildren.length;
    while(oldIndex< oldChildren.length){
        let oldKey = oldChildren[oldIndex].key;
        if(!newKeys.includes(oldKey)){
            remove(oldIndex);
            oldChildren.splice(oldIndex,1);
        }else{
            oldIndex++; 
        }
    }
    
    oldIndex = 0;
    let newIndex = 0;
    //对比 newKey 和 oldKey 的不同 , 插入新的节点 
    
    while(newIndex<newLength){
        let newKey =( newChildren[newIndex]||{}).key;
        let oldKey =( oldChildren[oldIndex]||{}).key;
        if(!oldKey){ // oldChildren 被遍历完的情况下  的情况下插入新的元素 newIndex++ 4c
            insert(newIndex,newKey);
            newIndex++;
        }else if(oldKey!=newKey){  // oldKey!=newKey 的情况下插入新的元素 newIndex++ 
            let nextOldKey = (oldChildren[oldIndex+1]||{}).key;
            if(nextOldKey==newKey){
                remove(newIndex);
                oldChildren.splice(oldIndex,1);
            }else{
                insert(newIndex,newKey);
                newIndex++;
            }
        }else{
            oldIndex++;
            newIndex++
        }
    }

    function insert(index,key){
        patches.push({type:INSERT,index,node:el("li",key,key)});
    }

    function remove(index){
        patches.push({type:REMOVE,index})
    }

    return patches;
}
