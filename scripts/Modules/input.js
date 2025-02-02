import {global} from "./global.js";


function move(event) {
    //Example Movement
    switch(event.key) {
        case "d":
        if (global.playerObject.physicsData.dashAcceleration == 0){
            global.playerObject.xVelocity = global.playerObject.width*5;
            if(global.playerObject.direction != 1){
                global.playerObject.direction = 1;
            }
            if(global.playerObject.physicsData.dashAcceleration < 0){
                global.playerObject.physicsData.dashAcceleration = 0;
                global.playerObject.physicsData.dashDecay = 0;
            }
        }
            break;
        case "a":
            global.playerObject.xVelocity = -global.playerObject.width*5;
            if(global.playerObject.direction != -1){
                global.playerObject.direction = -1;
            }
            if(global.playerObject.physicsData.dashAcceleration > 0){
                global.playerObject.physicsData.dashAcceleration = 0;
                global.playerObject.physicsData.dashDecay = 0;
            }
            break;
        case " ":
            if (!global.panicRoom){
                global.playerObject.jump();
            }
            break;
        case "x":
            if(!global.panicRoom){
                global.playerObject.x = global.blockSize*2;
                global.playerObject.y = global.blockSize*20;

                global.enemy.x = global.blockSize*13;
                global.enemy.y = global.blockSize*19;

                global.score = 0;
                global.bg_music.pause();
                global.panic_room.currentTime = 0;
                global.panic_room.play();
                global.enemy.xVelocity = 0;
                global.enemy.yVelocity = 0;
                global.enemy.follow = false;

            } else if (global.panicRoom){
                global.playerObject.x = global.playerObject.startX;
                global.playerObject.y = global.playerObject.startY;

                global.enemy.x = global.enemy.startX;
                global.enemy.y = global.enemy.startY;
                global.enemy.follow = false;
                global.panic_room.pause()
            }
            break;
        case "j":
            if(!global.panicRoom){
                global.playerObject.dash();
            }
            break;
    }
}

function stop() {
    switch(event.key) {
        case "d":
            if (global.playerObject.xVelocity > 0) {
                global.playerObject.xVelocity = 0;
            }
            global.playerObject.prevVelocityX = 0;
            break;
        case "a":
            if (global.playerObject.xVelocity < 0) {
                global.playerObject.xVelocity = 0;
            }
            global.playerObject.prevVelocityX = 0;
            break;
        case "w":
            if (global.playerObject.yVelocity < 0) {
                global.playerObject.yVelocity = 0;
            }
            global.playerObject.physicsData.gravityOn = true;
            break;
    }
}

document.addEventListener("keypress", move);

//if you just want to move as long as the player presses a key:
document.addEventListener("keyup", stop);