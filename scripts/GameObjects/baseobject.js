import { global } from "../Modules/global.js";

class BaseObject {
    active = true;
    ai = false;
    name = "";
    x = 100;
    y = 500;
    
    prevX = 0;
    prevY = 0;
    
    width = 50;
    height = 50;
    
    index = 0;

    lastGround = {};

    direction = 1;

    xVelocity = 0;
    yVelocity = 0;

    prevVelocityX = 0;
    prevVelocityY = 0;
    prevDirection = 0;

    physicsData = {
        "gravityOn": false,
        "isGrounded": false,
        "terminalVelocity": 0,
        "fallSpeed": 0,
    }
    

    animationData = {
        "spriteSheetOffset": 0,
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0,
        "loop": true,
    };

    storePositionOfPreviousFrame = function () {
        this.prevX = this.x;
        this.prevY = this.y;
    };

    getBoxBounds = function () {
        let bounds = {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        }
        return bounds;
    };

    update = function () { 

    };


    draw = function () {
        let sprite = this.getNextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };

    getNextSprite = function () {
        this.animationData.currentSpriteElapsedTime += global.deltaTime;

        if (this.animationData.currentSpriteElapsedTime >= this.animationData.timePerSprite) {
            this.animationData.currentSpriteIndex++;
            this.animationData.currentSpriteElapsedTime = 0;
            if (this.animationData.currentSpriteIndex > this.animationData.lastSpriteIndex && this.animationData.loop) {
                this.animationData.currentSpriteIndex = this.animationData.firstSpriteIndex
            } else if (this.animationData.currentSpriteIndex > this.animationData.lastSpriteIndex && !this.animationData.loop){
                this.animationData.currentSpriteIndex = this.animationData.lastSpriteIndex
            }
        }
        return this.animationData.animationSprites[this.animationData.currentSpriteIndex];
    };


    loadImages = function (imageSources) {
        /* first load images from path */
        for (let i = 0; i < imageSources.length; i++) {
            let image = new Image();
            image.src = imageSources[i];
    
            /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
            this.animationData.animationSprites.push(image);
        }

    };

    loadImagesFromSpritesheet(spritesheetPath, cols, rows) {
        // Calculate the number of rows and columns
        //const cols = Math.floor(spritesheetWidth / singleSpriteWidth);
        //const rows = Math.floor(spritesheetHeight / singleSpriteHeight);
        const totalSprites = cols * rows;
    
        // Pre-create an array with `Image` objects for all sprites
        this.animationData.animationSprites = Array.from({ length: totalSprites }, () => new Image());
    
        // Load the spritesheet
        const spritesheet = new Image();
        spritesheet.src = spritesheetPath;
    
        // Add a "load" event listener to the spritesheet
        spritesheet.addEventListener("load", () => {
            const spritesheetWidth = spritesheet.width;
            const spritesheetHeight = spritesheet.height;
            const singleSpriteWidth = Math.floor(spritesheetWidth / cols);
            const singleSpriteHeight = Math.floor(spritesheetHeight / rows);


            // Create a temporary canvas to extract sprites from the spritesheet
            const tempSpritesheetCanvas = document.createElement("canvas");
            const tempSpritesheetCtx = tempSpritesheetCanvas.getContext("2d");
            tempSpritesheetCanvas.width = singleSpriteWidth;
            tempSpritesheetCanvas.height = singleSpriteHeight;

            // Loop through each sprite's row and column position
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                
                    // Clear the temporary canvas and draw the specific sprite region from the spritesheet
                    tempSpritesheetCtx.clearRect(0, 0, singleSpriteWidth, singleSpriteHeight);
                    tempSpritesheetCtx.drawImage(
                        spritesheet,
                        col * singleSpriteWidth,
                        row * singleSpriteHeight,
                        singleSpriteWidth,
                        singleSpriteHeight,
                        0,
                        0,
                        singleSpriteWidth,
                        singleSpriteHeight
                    );
    
                    // assign it to the corresponding Image object
                    const index = row * cols + col;
                    this.animationData.animationSprites[index].src = tempSpritesheetCanvas.toDataURL();
                }
            }
        });
    }

    switchCurrentSprites = function (firstSpriteIndex, lastSpriteIndex) {
        this.animationData.currentSpriteIndex = firstSpriteIndex;
        this.animationData.firstSpriteIndex = firstSpriteIndex;
        this.animationData.lastSpriteIndex = lastSpriteIndex;
    }

    reactToCollision = function(collidingObject) {

    }

    applyGravity = function(){
        if(!this.physicsData.isGrounded && this.physicsData.gravityOn){
            if (this.physicsData.fallSpeed <= this.physicsData.terminalVelocity){
                this.physicsData.fallSpeed += global.gravityForce * global.deltaTime
            } else{
                this.physicsData.fallSpeed = this.physicsData.terminalVelocity
            }
            this.y += this.physicsData.fallSpeed;
        } else if (this.physicsData.isGrounded || !this.physicsData.gravityOn){
            this.physicsData.fallSpeed = 0
        }
        if (this.physicsData.dashAcceleration != 0 && (this.physicsData.dashAcceleration < -0.2 || this.physicsData.dashAcceleration > 0.2)){
            this.physicsData.dashDecay += global.deltaTime;
            this.physicsData.dashAcceleration -= this.direction * this.physicsData.dashDecay;
            this.x += this.physicsData.dashAcceleration;
            this.xVelocity = 0;
        } else if (this.physicsData.dashAcceleration != 0 && (this.physicsData.dashAcceleration > -0.2 || this.physicsData.dashAcceleration < 0.2)){
            this.physicsData.dashAcceleration = 0;
            this.physicsData.dashDecay = 0;
            this.xVelocity = this.prevVelocityX;
        }
    }

    jump = function(){
        if(this.physicsData.isGrounded){
            this.physicsData.fallSpeed = -this.physicsData.jumpForce;
            this.y -= 10;
        }
    }

    dash = function(){
        if(this.physicsData.dashAcceleration == 0 && (this.physicsData.dashCount > 0 || this.physicsData.isGrounded)){
            this.prevVelocityX = this.xVelocity;
            this.physicsData.fallSpeed = 0;
            this.physicsData.dashAcceleration = this.direction * this.physicsData.dashForce;
            this.physicsData.dashCount -= 1;
        }
    }

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.previousX = x;
        this.previousY = y;
        global.allGameObjects.push(this);
        this.index = global.allGameObjects.length - 1;
    }

}

export {BaseObject}