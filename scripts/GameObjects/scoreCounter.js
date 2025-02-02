import { global } from "../Modules/global.js"

const scoreCounter = {}

scoreCounter.drawCounter = function(){
    global.ctx.font = "32px Jacquard";
    global.ctx.fillStyle = "white";
    global.ctx.fillText(`Score: ${global.score}`, global.blockSize*16.5, global.blockSize*19);
    if(global.score >= global.highscore){
        global.highscore = global.score
    }
    global.ctx.fillText(`Highscore: ${global.highscore}`, global.blockSize*16.5, global.blockSize*20)
    if(global.panicRoom){
        global.ctx.fillText('"X" to pause', global.blockSize*24, global.blockSize*19)
        global.ctx.fillText('"Space" to jump', global.blockSize*24, global.blockSize*20)
        global.ctx.fillText('"J" to dodge fire', global.blockSize*24, global.blockSize*21)
    }
};

export{scoreCounter}

