'use strict';

class BinaryTree {
    constructor() {
        this.root = null;
	}

	insert(data) {
        if(!this.root){
            this.root = new Node(data);
            return;
        }

        var actNode = this.root; 
            while(actNode){
                if(data > actNode.data){
                    if(!actNode.right){
                        actNode.right = new Node(data);
                        break;
                    }
                    else {actNode = actNode.right;
                    }
                }
                else {
                    if(!actNode.left){
                        actNode.left = new Node(data);
                        break;
                    }
                    else {actNode = actNode.left;
                    }
                }
            }
    }

	contains(data) {
		var detect = false;
		var act = this.root;

        while(!detect && act){
            
            if (data > act.data){
                act = act.right;	
            } 
            else 

            if (data < act.data){
            act = act.left;
            } 
            else {
                detect = true;
            }
        }
        return detect;
    }
	
	remove(data) {
	    var detect = false;
		var	act = this.root;
        do {
            if (data > act.data){
                var parent = null;
                parent = act;
                act = act.right;
            } 
            else if (data < act.data){
                parent = act;
                act = act.left;
            } 
            else {
                detect = true;
            }
        } while(detect === false  && act);

        if (detect){
		var	childCalc = (act.right !== null ? 1 : 0) + 
						(act.left !== null ? 1 : 0);

            if (act === this.root){
                switch(childCalc){
                    case 0:
                    this.root = null;
                    break;

                    case 1:
                    this.root = (act.right === null ? act.right : act.left);
                    break;

                    case 2:			
                    var replace = this.root.left;
                    do {
                        var replaceParent = replace.right;
                    } while (replace.right !== null);

                    if (replace !== null){
                        replace.right = replaceParent.left;
                        replaceParent.right = this.root.right;
                        replaceParent.left = this.root.left;
                    } 
                    else {
                        replaceParent.right = this.root.right;
                    }
                    this.root = replaceParent;
                }        
            } 
            else {
                switch (childCalc){
                    case 0:
                    if (act.data > parent.data){
                        parent.right = null;
                    } 
                    else {
                        parent.left = null;
                    }
                    break;

                    case 1:
                    if (act.data < parent.data){
                        parent.left = (act.left === null ? act.right : act.left);
                    } 
                    else {
                        parent.right = (act.left === null ? act.right : act.left);
                    }
                    break;

                    case 2:
                    replace = act.left;
                    if(replace.right !== null){
                        replace = replace.right;
                    }
                    //flowing.left = replace.left;
                    //replace.right = flowing.right;
                    //replace.left = flowing.left;
                    else if (act.data < parent.data){
                        parent.left = replace;
                    } 
                    else {
                        parent.right = replace;
                    }     
                }
            }
		}
	}

	size() {
        var length = 0;
		if (this.root === null){
			return length;
		}
		else {
			length++;
			(function scale(node) {
				if (node.right) {
					length++;
					scale(node.right);	
				}
				if (node.left) {
					length++;
					scale(node.left);
				}
			})
            (this.root);
		}
        return length;	
    }

	isEmpty() {
		return !this.root;
	}
}
