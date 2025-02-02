import { global } from "./global.js";
import { Player } from "../GameObjects/player.js";
import { Wall } from "../GameObjects/wall.js";
import {Coin} from "../GameObjects/collectible.js"
import {Enemy} from "../GameObjects/enemy.js";
import {map} from "../GameObjects/map.js";
import {scoreCounter} from "../GameObjects/scoreCounter.js";
import {Panic_room} from "../GameObjects/panicroom.js";

function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 
    if(!global.panicRoom){
        global.panic_room.pause();
        global.bg_music.play();
    } else if(global.panicRoom){
        global.panic_room.play();
        global.bg_music.pause();
    }
    for (let i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active) {
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.playerObject.screenbounds();
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].applyGravity();
            global.enemy.followAI();
            global.enemy.respawnEnemy();
            global.playerObject.changeAnimationSprites();
            scoreCounter.drawCounter();
            global.allGameObjects[i].draw();
        }

    }
    
    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {
    global.score = 0;
    new Panic_room(0*global.blockSize, 18*global.blockSize);
    global.playerObject = new Player(2*global.blockSize, 20*global.blockSize, 2*global.blockSize, 2*global.blockSize);
    global.enemy = new Enemy(13*global.blockSize, 19*global.blockSize)
    for (let i = 0; i < map.length; i++){
        for (let j = 0; j < map[0].length; j++){
            if(map[i][j] == 1){
                new Wall(j*global.blockSize, i*global.blockSize);
            } else if (map[i][j] == 2){
                new Coin(j*global.blockSize, i*global.blockSize);
            }
        }
    }
    global.respawnCoins(0)
}

setupGame();
requestAnimationFrame(gameLoop);



// This event listener is used to pause the game when the user switches to another tab or minimizes the window
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      global.deltaTime = performance.now();
    } 
});