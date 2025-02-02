import { global } from "../Modules/global.js"
import { BaseObject } from "./baseobject.js";

class Enemy extends BaseObject{
    name = "Enemy";
    ai = true;
    follow = false;
    respawnTime = 1;
    currentRespawnTime = 0;

    startX = 0;
    startY = 0;

    animationData = {
        "spriteSheetOffset": 0,
        "animationSprites": [],
        "timePerSprite": 0.1,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 0,
        "lastSpriteIndex": 4,
        "currentSpriteIndex": 0,
        "loop": true,
    };

    update = function () {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
    }

    followAI = function (){
        let lefter = (this.x + this.width/2 < global.playerObject.x + global.playerObject.width/2);
        let righter = (this.x + this.width/2 > global.playerObject.x + global.playerObject.width/2);
        let higher = (this.y + this.height/2 < global.playerObject.y + global.playerObject.height/2);
        let lower = (this.y + this.height/2 > global.playerObject.y + global.playerObject.height/2);
        if(this.follow && !(this.y + this.height > global.blockSize*18)){
            if (lefter || righter){
                this.xVelocity = -2 * (this.x + this.width/2 - (global.playerObject.x + global.playerObject.width/2));
            }
            if (higher || lower){
                this.yVelocity = -2 * (this.y + this.height/2 - (global.playerObject.y + global.playerObject.height/2));
            }
        }
    }

    reactToCollision = function (collidingObject) {
        let colliderBox = this.getBoxBounds();
        let collidingBox = collidingObject.getBoxBounds();

        let righter = (colliderBox.left >= collidingBox.right - 4)
        let lefter = (colliderBox.right <= collidingBox.left + 4)
        let higher = (colliderBox.bottom <= collidingBox.top + 4)
        let lower = (colliderBox.top >= collidingBox.bottom - 4)
        switch (collidingObject.name){
            case "Player":
                if(collidingObject.physicsData.dashAcceleration == 0 && this.follow && !global.panicRoom){
                    this.xVelocity = 0;
                    this.yVelocity = 0;
                    this.follow = false;
                }
                break;
            case "Wall":
                if (higher && !lefter && !righter){
                    this.y = collidingBox.top - this.width - global.deltaTime;
                }
                 if (lefter && !higher && !lower){
                    this.x = collidingBox.left - this.width - global.deltaTime;
                 }
                if (righter && !higher && !lower){
                    this.x = collidingBox.right + global.deltaTime;
                }
                if (lower && !lefter && !righter){
                    this.y = collidingBox.bottom + global.deltaTime;
                }
                break;
        }
    };
    
    respawnEnemy = function () {
        if (this.follow == false && this.x == this.startX){
            this.currentRespawnTime += global.deltaTime / 100;

            if (this.currentRespawnTime >= this.respawnTime) {
                this.currentRespawnTime = 0;
                this.follow = true;
            }
        }
    };



    constructor(x, y){
        super(x, y, global.blockSize, global.blockSize)
        this.startX = global.blockSize*15;
        this.startY = global.blockSize*3;
        this.animationData.loop = true;
        global.enemies.push(this);
        this.loadImagesFromSpritesheet("/Images/fire.png", 5, 1);

    }
}

export {Enemy}