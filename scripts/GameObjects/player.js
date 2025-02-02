import {global} from "../Modules/global.js";
import { BaseObject } from "./baseobject.js";

class Player extends BaseObject{
    name = "Player";

    xVelocity = 0;
    yVelocity = 0;

    startX = 0;
    startY = 0;

    physicsData = {
        "gravityOn": true,
        "isGrounded": false,
        "terminalVelocity": 3,
        "fallSpeed": 0,
        "jumpForce": 3,
        "dashForce": 6,
        "dashAcceleration": 0,
        "dashDecay": 0,
        "dashCount": 2,
        
    }

    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.5,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 1,
        "currentSpriteIndex": 0
    };

    update = function () {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        global.panicRoom = global.playerObject.y + global.playerObject.height > global.blockSize*18
    }

    screenbounds = function (){
        let canvasBounds = global.getCanvasBounds();
        let playerBounds = this.getBoxBounds();
        if (playerBounds.left <= canvasBounds.left) {
            this.x = canvasBounds.left + global.blockSize + 1;
        } else if (playerBounds.right >= canvasBounds.right) {
            this.x = canvasBounds.right - this.width - global.blockSize - 1;
        } else if (playerBounds.top <= canvasBounds.top) {
            this.y = canvasBounds.top + global.blockSize + 1;
        } else if (playerBounds.bottom >= canvasBounds.bottom) {
            this.y = canvasBounds.bottom - this.height - global.blockSize - 1;
        }
    }

    // Handles the player's reaction to a collision with another game object.
    // Depending on the type of object collided with, the player will react accordingly.
    // For example, if the player collides with a wall, it will stop falling due to gravity.
    reactToCollision = function (collidingObject) {
        let colliderBox = this.getBoxBounds();
        let collidingBox = collidingObject.getBoxBounds();


        let righter = (colliderBox.left >= collidingBox.right - global.blockSize / 4)
        let lefter = (colliderBox.right <= collidingBox.left + global.blockSize / 4)
        let higher = (colliderBox.bottom <= collidingBox.top + global.blockSize / 4)
        let lower = (colliderBox.top >= collidingBox.bottom - global.blockSize / 4)
        
        switch (collidingObject.name){
            case "Wall":
                if (higher && !lefter && !righter){
                    this.physicsData.isGrounded = true;
                    this.physicsData.fallSpeed = 0;
                    this.physicsData.dashCount = 2;
                    this.y = collidingBox.top - this.width - global.deltaTime;
                    this.lastGround = collidingObject;
                }
                if (lefter && !higher && !lower){
                   this.x = collidingBox.left - this.width - global.deltaTime;
                   if (this.physicsData.direction > 0 && this.physicsData.dashAcceleration !=0){
                       this.physicsData.dashAcceleration = 0;
                   }
                }
                if (righter && !higher && !lower){
                    this.x = collidingBox.right + global.deltaTime;
                    if (this.physicsData.direction < 0 && this.physicsData.dashAcceleration !=0){
                        this.physicsData.dashAcceleration = 0;
                    }
                }
                if (lower && !lefter && !righter){
                    this.y = collidingBox.bottom + global.deltaTime;
                    this.physicsData.fallSpeed = 0;
                }
                break;
            case "Coin":
                collidingObject.active = false;
                global.coin_sound.pause();
                global.coin_sound.currentTime = 0;
                global.coin_sound.play();
                global.score ++
                global.respawnCoins(collidingObject.index); 
                break;
            case "Enemy":
                if(this.physicsData.dashAcceleration == 0 && collidingObject.follow && !global.panicRoom){
                    global.death_sound.pause();
                    global.death_sound.currentTime = 0;
                    global.death_sound.play();

                    global.score = 0;
                    global.playerObject.x = global.blockSize*2;
                    global.playerObject.y = global.blockSize*20;

                    global.enemy.x = global.blockSize*13;
                    global.enemy.y = global.blockSize*19;
                }
        }
    };

    changeAnimationSprites = function () {
        if (this.direction > 0 && this.animationData.spriteSheetOffset != 0){
            this.animationData.spriteSheetOffset = 0;
        }else if (this.direction < 0 && this.animationData.spriteSheetOffset != 72){
            this.animationData.spriteSheetOffset = 72;
        }
        //idle animation
        if (this.animationData.lastSpriteIndex != 1 + this.animationData.spriteSheetOffset && this.physicsData.isGrounded && this.xVelocity == 0 && this.prevVelocityX == 0){
            this.animationData.loop = true
            this.switchCurrentSprites(0 + this.animationData.spriteSheetOffset, 1 + this.animationData.spriteSheetOffset)
            this.animationData.timePerSprite = 0.3
        }
        //running animation
        if (this.animationData.lastSpriteIndex != 31 + this.animationData.spriteSheetOffset && this.physicsData.isGrounded && this.xVelocity != 0 && this.physicsData.dashAcceleration == 0){
            this.animationData.loop = true
            this.animationData.timePerSprite = 0.1
            this.switchCurrentSprites(24 + this.animationData.spriteSheetOffset, 31 + this.animationData.spriteSheetOffset)
        }
        //jumping animation
        if ((this.animationData.lastSpriteIndex != 43 + this.animationData.spriteSheetOffset)  && this.physicsData.fallSpeed <= global.deltaTime && !this.physicsData.isGrounded){
            this.animationData.loop = false
            this.switchCurrentSprites(40 + this.animationData.spriteSheetOffset, 43 + this.animationData.spriteSheetOffset)
            this.animationData.timePerSprite = 0.1
        }
        //falling animation
        if ((this.animationData.lastSpriteIndex != 47 + this.animationData.spriteSheetOffset)  && this.physicsData.fallSpeed > 0.5 && !this.physicsData.isGrounded){
            this.animationData.loop = false
            this.switchCurrentSprites(44 + this.animationData.spriteSheetOffset, 47 + this.animationData.spriteSheetOffset)
            this.animationData.timePerSprite = 0.3
        }
    }


    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.startX = global.blockSize*15;
        this.startY = global.blockSize*15;
        this.loadImagesFromSpritesheet("../Images/player/AnimationSheet_Character.png", 8, 18);
    }
}

export { Player }
