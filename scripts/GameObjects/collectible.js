import { global } from "../Modules/global.js"
import { BaseObject } from "./baseobject.js";

class Coin extends BaseObject{
    name = "Coin"

    active = false;

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

    constructor(x, y){
        super(x, y, global.blockSize, global.blockSize)
        this.animationData.loop = true;
        this.index = global.coins.length + 1
        global.coins.push(this.index);
        this.loadImagesFromSpritesheet("/Images/coin.PNG", 5, 1);
    }
}

export {Coin}