class Character extends MovableObject {
    y = 184;
    height = 250;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    //world is the variable which make it possible for the class character to have access to variables of class world
    world;
    speed = 5;
    walking_sound = new Audio('audio/standardWalking.mp3')


    //in constructor we load the functions we want the object to start instanly with. Animate makes the character acessable to animation
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();

    };

    animate() {

        //checks 60times per second which key has been pressed by checking the keyboard direction variables
        setInterval(() => {

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                //walk to right position by increasing x by speed
                this.x += this.speed;
                this.otherDirection = false;

                //TODO TURN ON SOUND AGAIN
                // this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > -100) {
                //walk to left position by decreasing x by speed
                this.x -= this.speed;
                this.otherDirection = true;

                //TODO TURN ON SOUND AGAIN
                // this.walking_sound.play();

                //TODO change this coordinate to make camera move to the other side if he changes directions to make a smoother picture
                //this.world.camera_x = -this.x + 100;
            }
            //focus camera on character and changes the starting point of him
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);


        //makes sound reset after stop pressing a key to run with the Character
        //TODO TURN ON SOUND AGAIN

        // setInterval(() => {
        //     if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
        //         this.walking_sound.pause();
        //         this.walking_sound.currentTime = 0.5;
        //     }
        // }, 1000 / 60);


        //checks pressed key and starts animation of character
        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

                //Walk animation
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 50);


    };


    jump() {};



}