class Character extends MovableObject {
    // y = 184;
    height = 250;
    //y  = 90;
    y = 190;
    charDmg = 20;
    //width is 100;
    //world is the variable which make it possible for the class character to have access to variables of class world
    world;
    speed = 5;
    immortalDuration = 1.5;
    cameraSpeed = 5;
    walking_sound = new Audio('audio/standardWalking.mp3');
    offset = {
        top: 80,
        left: 15,
        right: 25,
        bottom: 0,
    };
    bottleAmount = 0;
    coinAmount = 0;
    longIdle = 8;
    startIdle = 4;
    bottleInventoryCounter = 0;

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


    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];


    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];


    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];


    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];



    //in constructor we load the functions we want the object to start instanly with. Animate makes the character acessable to animation
    constructor() {
        super();
        this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.animate();
    };

    animate() {

        //checks 60times per second which key has been pressed by checking the keyboard direction variables
        setInterval(() => {

            if (!world.gamePaused && this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && this.energy > 0) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
                if (this.world.camera_x == -this.x + 120 + 5) {

                    this.world.camera_x = -this.x + 120;
                }
                // console.log(-this.x + 120)
                // this.world.camera_x = -this.x + 120;
                // console.log('camera right walk = ', world.camera_x, 'calculated pos', -this.x + 120)

            }
            if (!world.gamePaused && this.world.keyboard.LEFT && this.x > -100 && this.energy > 0) {
                this.moveLeft(this.speed);
                this.walking_sound.play();
                this.otherDirection = true;
                if (this.world.camera_x == (-this.x + 500) - 5) {
                    this.world.camera_x = -this.x + 500;
                }
                // console.log(-this.x + 500)
                // this.world.camera_x = -this.x + 500;
                // console.log('camera left walk position = ', world.camera_x, 'calculated pos', -this.x + 500)

                //TODO change this coordinate to make camera move to the other side if he changes directions to make a smoother picture
                //this.world.camera_x = -this.x + 100;
            }
            if (!world.gamePaused && this.world.keyboard.SPACE && !this.isAboveGround() && this.energy > 0) {
                this.jump();
            }


            //focus camera on character and changes the starting point of him
        }, 1000 / 65);


        setInterval(() => {
            if (!this.otherDirection && this.world.camera_x > (-this.x + 120)) {
                this.smoothCamera(+this.cameraSpeed);
            }

            if (this.otherDirection && this.world.camera_x < (-this.x + 500)) {
                this.smoothCamera(-this.cameraSpeed);
            }

        }, 5);


        //makes sound reset after stop pressing a key to run with the Character
        setInterval(() => {
            if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
                this.walking_sound.pause();
                this.walking_sound.currentTime = 0.5;
            }
        }, 1000 / 60);


        //checks pressed key and starts animation of character
        setInterval(() => {
            if (!world.gamePaused && this.isHurt(this.immortalDuration) && !this.isDead()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (!world.gamePaused && this.isAboveGround() && !this.isDead()) {
                // console.log('Last Y', this.lastY, 'current Y', this.y, 'CALCULATED', (this.lastY - this.y))
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (!world.gamePaused && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && this.energy > 0 && !this.isDead()) {
                //Walk animation
                this.playAnimation(this.IMAGES_WALKING);
            } else if (!world.gamePaused && this.characterStartLongIdling(this.longIdle) && this.lastKeyPress > 0 && !this.isDead()) {
                console.log('long idle', this.characterStartLongIdling(this.startIdle));
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else if (!world.gamePaused && this.characterStartIdling(this.startIdle) && !this.isDead()) {
                console.log('short idle', this.characterStartIdling(this.startIdle));
                this.playAnimation(this.IMAGES_IDLE);
            } else if (!world.gamePaused && !this.isDead()) {
                this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
            }
        }, 220);


        setInterval(() => {
            if (this.isDead() && !this.isHurt()) {
                if (this.deadLoop <= (this.IMAGES_DEAD.length - 1)) {
                    this.loadImage(this.IMAGES_DEAD[this.deadLoop]);
                    this.deadLoop += 1;
                }
            }
        }, 350);





        // setInterval(() => {
        //     if (this.otherDirection && this.world.camera_x < (-this.x + 500) && !this.camLock) {
        //         console.log('adding camera', this.world.camera_x, (-this.x + 500) - 5);
        //         this.smoothCamera(-this.cameraSpeed);
        //     } else if (this.world.camera_x == (-this.x + 500) && this.otherDirection) {
        //         console.log('works', this.world.camera_x)
        //         this.world.camera_x = (-this.x + 500);
        //         console.log('calc', this.world.camera_x, -this.x + 500)

        //     }



        //     else if (this.world.camera_x >= (-this.x + 120) && !this.otherDirection) {
        //         this.smoothCamera(+this.cameraSpeed);
        //     }
        // }, 5);


    };



    smoothCamera(speed) {
        this.world.camera_x -= speed;
    };

}