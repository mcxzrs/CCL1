import { global } from "../Modules/global.js"
import { BaseObject } from "./baseobject.js";

class Wall extends BaseObject {
    name = "Wall";

    tileType = 0;
    constructor(x, y) {
        super(x, y, global.blockSize, global.blockSize);
        // this.animationData.loop = false
        this.tileType = Math.floor(Math.random() * 4 + 1)
        this.loadImages([`/Images/tiles/tiles${this.tileType}.PNG`]);
    }
}

export { Wall }