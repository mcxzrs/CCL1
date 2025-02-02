import {global} from "../Modules/global.js";
import {BaseObject} from "./baseobject.js";

class Panic_room extends BaseObject{
    name = "Panic_room";
    constructor(x, y) {
        super(x, y, 16*global.blockSize, 4*global.blockSize);
        this.loadImages([`/Images/panicroom.PNG`]);
    }
}

export {Panic_room}