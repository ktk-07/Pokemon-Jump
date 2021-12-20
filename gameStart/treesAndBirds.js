class Tree{
    constructor(){
        // w 15-30, h 80-100;
        this.width = (Math.random() * (50-30)) + 31;
        this.height = (Math.random() * (100-70) ) + 71;
        this.x = 1000
        this.y = 260;
        //348 is the height of ground.NOT INCLuding underground .Bottoom of the page coordinate is 300;
        this.positionY = 348;
        this.velocityX = 7;
        this.colour = Math.random() * 360 + 1;
    }
    drawTree(){
        ctx.fillStyle = `hsl(${this.colour},100%,50%)`;
        //ctx.fillRect(this.x,this.positionY - this.height,this.width,this.height);
        ctx.drawImage(treeImg,this.x,this.positionY- this.height,this.width ,this.height);
    }
    updateTreePos(gameSpeed = 1){
        this.x -= this.velocityX + gameSpeed;
    }
}

let trees = [];

const initTree = (numberOfTrees) =>{
        trees.push(new Tree);
}


// Frank lab guy handle collison outside;
