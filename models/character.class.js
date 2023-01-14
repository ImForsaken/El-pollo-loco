class Character extends MovableObject {
    // y = 184;
    height = 250;
    y = 80;
    //world is the variable which make it possible for the class character to have access to variables of class world
    world;
    speed = 5;
    walking_sound = new Audio('audio/standardWalking.mp3')

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];


    //in constructor we load the functions we want the object to start instanly with. Animate makes the character acessable to animation
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.applyGravity();
        this.animate();
    };

    animate() {

        //checks 60times per second which key has been pressed by checking the keyboard direction variables
        setInterval(() => {

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > -100) {
                this.moveLeft(this.speed);
                this.walking_sound.play();
                this.otherDirection = true;

                //TODO change this coordinate to make camera move to the other side if he changes directions to make a smoother picture
                //this.world.camera_x = -this.x + 100;
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
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
            if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    //Walk animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);


    };






}