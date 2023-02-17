class Character extends MovableObject {
    height = 250;
    y = 190;
    charDmg = 20;
    speed = 5;
    immortalDuration = 1.5;
    bottleCooldown = 0.5;
    lastBottleThrown = new Date().getTime();
    cameraSpeed = 5;
    walking_sound = new Audio('audio/standardWalking.mp3');
    jump_sound = new Audio('audio/jump.mp3');
    charDead_sound = new Audio('audio/charDead.mp3');
    charHurt_sound = new Audio('audio/hurt.mp3');

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
        this.charMoveActions();
        this.camerMovement();
        this.playCharAnimations();
        this.playDeadAnimation();
        this.charMovementSounds();
    };


    charMoveActions() {
        //checks 60times per second which key has been pressed by checking the this.world.keyboard direction variables
        setInterval(() => {
            this.charMoveRight();
            this.charMoveLeft();
            this.charJump();
        }, 1000 / 65);
    }


    camerMovement() {
        setInterval(() => {
            this.moveCameraLeft();
            this.moveCameraRight();
        }, 5);
    }


    charMovementSounds() {
        //makes sound reset after stop pressing a key to run with the Character
        setInterval(() => {
            if (!keyboard.RIGHT && !keyboard.LEFT) this.stopWalkingSound();
        }, 1000 / 60);
    }


    playDeadAnimation() {
        setInterval(() => {
            if (this.checkCharIsDead()) this.playDead();
        }, 350);
    }


    playCharAnimations() {
        setInterval(() => {
            if (this.checkIfCharIsHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.checkIfCharIsJumping()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.checkCharWalking()) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (this.checkCharLongIdle()) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else if (this.checkCharIdle()) {
                this.playAnimation(this.IMAGES_IDLE);
            } else if (this.checkCharIsAfk()) {
                this.loadImage('img/2_character_pepe/1_idle/idle/I-1.png');
            }
        }, 220);
    }



    charMoveRight() {
        if (this.checkIfCharMovesRight()) {
            this.moveCharToRight()
        }
    }


    charMoveLeft() {
        if (this.checkIfCharMovesLeft()) {
            this.moveCharToLeft();
        }
    }


    charJump() {
        if (this.checkCharJump()) {
            this.jump();
            world.soundCheck(this.jump_sound, 0.2);
        }
    }


    moveCharToRight() {
        this.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) {
            world.soundCheck(this.walking_sound, 0.05);
        }
        if (world.camera_x == -this.x + 120 + 5) {
            world.camera_x = -this.x + 120;
        }
    }


    moveCharToLeft() {
        this.moveLeft(this.speed);
        if (!this.isAboveGround()) {
            world.soundCheck(this.walking_sound, 0.05);
        }
        this.otherDirection = true;
        if (world.camera_x == (-this.x + 500) - 5) {
            world.camera_x = -this.x + 500;
        }
    }


    checkCharJump() {
        return !world.gamePaused && keyboard.SPACE && !this.isAboveGround() && this.energy > 0;
    }


    checkIfCharMovesLeft() {
        return !world.gamePaused && keyboard.LEFT && this.x > -100 && this.energy > 0;
    }


    checkIfCharMovesRight() {
        return !world.gamePaused && keyboard.RIGHT && this.x < world.level.level_end_x && this.energy > 0;
    }


    moveCameraRight() {
        if (this.checkCameraPositionRight()) {
            this.smoothCamera(-this.cameraSpeed);
        }
    }


    moveCameraLeft() {
        if (this.checkCameraPositionLeft()) {
            this.smoothCamera(+this.cameraSpeed);
        }
    }


    checkCameraPositionLeft() {
        return !this.otherDirection && world.camera_x > (-this.x + 120);
    }


    checkCameraPositionRight() {
        return this.otherDirection && world.camera_x < (-this.x + 500);
    }


    stopWalkingSound() {
        this.walking_sound.pause();
        this.walking_sound.currentTime = 0.5;
    }


    checkCharIsDead() {
        return this.isDead() && !this.isHurt();
    }


    checkIfCharIsHurt() {
        return !world.gamePaused && this.isHurt(this.immortalDuration) && !this.isDead();
    }


    checkIfCharIsJumping() {
        return !world.gamePaused && this.isAboveGround() && !this.isDead();
    }


    checkCharWalking() {
        return !world.gamePaused && (keyboard.RIGHT || keyboard.LEFT) && this.energy > 0 && !this.isDead();
    }


    checkCharLongIdle() {
        return !world.gamePaused && this.characterStartLongIdling(this.longIdle) && this.lastKeyPress > 0 && !this.isDead();
    }


    checkCharIdle() {
        return !world.gamePaused && this.characterStartIdling(this.startIdle) && !this.isDead();
    }


    checkCharIsAfk() {
        return !world.gamePaused && !this.isDead();
    }


    playDead() {
        if (this.deadLoop <= (this.IMAGES_DEAD.length - 1)) {
            world.soundCheck(this.charDead_sound, 0.3);
            world.gameLost = true;
            this.loadImage(this.IMAGES_DEAD[this.deadLoop]);
            this.deadLoop += 1;
        }
    }


    smoothCamera(speed) {
        world.camera_x -= speed;
    };
}