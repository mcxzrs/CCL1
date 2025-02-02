const global = {};

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");

global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.enemies = []
global.coins = [];
global.playerObject = {};
global.enemy = {};
global.panicRoom = false;

global.blockSize = 32;

global.gravityForce = 5;
global.maxCoins = 1;
global.score = 0;
global.highscore = 0;

global.bg_music = document.createElement("audio");
global.bg_music.src = "../Sounds/bg_music.mp3"; //path to the sound file
global.bg_music.volume = 0.4; //setting the volume
global.bg_music.loop = true; //looping the music

global.panic_room = document.createElement("audio");
global.panic_room.src = "../Sounds/panic_room.mp3"; //path to the sound file
global.panic_room.volume = 0.4; //setting the volume
global.panic_room.loop = true; //looping the music

global.coin_sound = document.createElement("audio");
global.coin_sound.src = "../Sounds/coin.mp3"
global.coin_sound.volume = 0.4;
global.coin_sound.loop = false;

global.death_sound = document.createElement("audio");
global.death_sound.src = "../Sounds/death.mp3"
global.death_sound.volume = 0.6;
global.death_sound.loop = false;


global.getCanvasBounds = function () {
    let bounds =  {
        "left": 0,
        "right": this.canvas.width,
        "top": 0, 
        "bottom": this.canvas.height
    }

    return bounds;
}

global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = givenObject.index; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];

        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
                }else if (givenObject.name == "Player" &&  // if the player
                    otherObject == givenObject.lastGround && // if collision didn't happen with player's last Ground
                    (givenObject.getBoxBounds().bottom <= otherObject.getBoxBounds().top - global.blockSize / 10 ||
                    (givenObject.getBoxBounds().right <= otherObject.getBoxBounds().left || givenObject.getBoxBounds().left >= otherObject.getBoxBounds().right)) &&   // if the player is sufficiently above the object 
                    givenObject.physicsData.isGrounded)
                {
                    givenObject.physicsData.isGrounded = false
                }
            }
            
        }
    }

global.coinsOnScreen = function (){
    let coins = 0;
    for (let i = 0; i < global.allGameObjects.length; i++){
        if (global.allGameObjects[i].name == "Coin" && global.allGameObjects[i].active){
            coins ++
        }
    }
    if (coins <= global.maxCoins){
        return true;
    } else{
        return false;
    }
}

global.respawnCoins = function(forbiddenIndex){
    let respawnIndex = Math.floor(Math.random() * global.coins.length + 1);
    for(respawnIndex; respawnIndex == forbiddenIndex;){
        respawnIndex = Math.floor(Math.random() * global.coins.length + 1);
    }
    for(let i = 0; i < global.allGameObjects.length; i++){
        if(!global.allGameObjects.active && global.allGameObjects[i].name == "Coin" && global.allGameObjects[i].index == respawnIndex){
            global.allGameObjects[i].active = true;
        }
    }
}

global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1.name != gameObject2.name) {
        if (box1.top <= box2.bottom && 
            box1.left <= box2.right && 
            box1.bottom >= box2.top &&
            box1.right >= box2.left)
        {
            return true;
        }
    }
    return false;
}

//====================================================================================================================================
export {global}