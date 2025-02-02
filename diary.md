Day 1
    I'm starting the coding without the template entirely, full of hopes and dreams. Struggle a bit, but overall everything is fine.
     i added:
        Base game object
        player
        gameloop
        modules
    i sure am looking forward for tomorrow. i says with excitements
Day 2
    Disaster. Everything is too scattered and hard to navigate, so i choose to use the template for basegameobject, global, and main to 
    have a better starting workspace.
    I deleted gravity function from basegameobject as well as a couple of other functions to have a feeling of fullfillment at the end of the codelab.
    Now the work begins
Day 3
    I add the player again, create wall object to start testing gravity and collision.
    I use a for loop to generate walls around the edges of the canvas and start playing.
    I spent the whole day trying to add proper velocity and make the character not move throught the walls.
Day 4
    Gravity is a disaster. I choose to work on collisions first.
    I make collision with walls differentiate between the sides from which the player collides to that i can make that sweet sweet seemless
    collision for walls. Before i add that, character stops moving down if it touches a side wall or stops moving to the sides if it touches the upper wall.
Day 5
    Fix all the troubles with collision, ready to work on gravity, i says with excitements. I was then diddled by gravity.
    I spend the day diddling gravity and emerge victorious but wounded. Gravity works, now i have to add jumping and dashes.
Day 6-8
    Working on jumping, perfecting it to work exactly how i want it to work. Game is still raw, i only have walls and the player, no enemies or collectibles.
    After making the jump i move on to dashing and encounter some problems with player speeding through the walls.
    Funny thing happened during debug, if you jump during dashing, character goes to lightspeed in 2 milliseconds, then after some time goes into negative lightspeed.
    That's not ideal, got to fix that.
Day 9
    Still working on dashes and jumping + fixing collision if problems arise. BUT
    it's time to work on animation. Get character from itch.io because scared
    time-skip a couple of hours and i got the animation for the player to work. Now i have to make it work both ways.
    Start thinking about how to do that efficiently, friend suggested making two spritesheets and loading different spritesheets everytime character turns around.
    I look at the loadImagesFromSpritesheet function and realise i'm not running a quantum computer and can't afford that.
    Smoking break and brainstorm.
    I use one spritesheet, but at the bottom of the regular one i add an inverted one.
    Now i implement spriteSheetOffset variable so that if the sprite 0 for regular sprite would be sprite 0 + spritesheetOffset for the inverted sprite.
    In this way i don't have to change my changeCurrentSprites function when i call it for running or jumping, i just have to switch the offset between 0 and the number of sprites in the initial spritesheet.
    It might not be the best solution, but i'm really proud of myself
Day 10
    Time to actually work on the game because deadline is soon. 
    I add collectibles and enemy object to the game.
    Add placeholder images for coins and enemy
Day 11
    I work on following AI for the enemy and give it collision, borrowed from the player object
    Draw animation for coins and make them look like sonic rings because that's lit
    Replace coin placeholder with said animation, i says with excitements
    Then everything on screen dissapears.
    Time-skip a couple of minutes and i fix it.
Day 12-14
    I add a matrix for creating the level layout, then i draw the tiles while my friend makes the desert background
    I start drawing the panic room background and struggle a lot
    Add places for coins to spawn on the level layout and make them spawn randomly one at a time
    At this stage, the game is almost ready:
        Player can collect coins around the level while running away from the friend
        If the player gets caught, their position gets restarted
    Make a score counter and instructions for movement + get feedback that jumping on "space" is bad game design and i should add jumping on "w"
    Feedback is welcome, however i keep it at "space" because it gives player more control than "w" and in my experience with platformers, jumping on a separate button is always better.
PRESENTATION
    i present the game, let people play it. Some people find it hard, but most say it's fun.
    i'm glad
    get some more feedback about the jump button.
    despair
POST PRESENTATION 
    i keep drawing the panic room and start working on the fire animation, i don't have enough time to draw the character, unfortunately, but
    thankfully the assets for this character were free and i'm keeping them because at this point i'm too attached to the little red hood.
    People around me agree.

    Finish the panic room and fire, start working on github repository and the diary(hello) trying to remember what i did in which day.
    I've yet to make a video explaining the code.
    Deadline is today, so wish me luck.  