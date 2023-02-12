class ThrowableObject extends MovableObject {
    bottleHit = false;
    bottleDamage = 20;
    throwBottle_sound = new Audio('audio/bottleThrow.mp3');

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];


    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];


    constructor(x, y, otherDirection) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.loadImages(this.IMAGES_ROTATION);
        this.x = x;
        this.y = y;
        this.height = 70;
        this.width = 70;
        this.otherDirection = otherDirection;
        this.throw();
        this.animte();
    }


    throw () {
        //THROW RIGHT IF CHAR LOOKS RIGHT SIDE  - OR Not   
        this.throwToRight();
        this.throwToLeft();
    }


    animte() {
        setInterval(() => {
            this.playRotation();
            this.playSplash();
        }, 50);
    }


    throwToRight() {
        if (!this.otherDirection) {
            this.flyRight();
        }
    }


    throwToLeft() {
        if (this.otherDirection) {
            this.flyLeft();
        }
    }


    flyRight() {
        this.speedY = 30;
        this.applyGravity();
        let interval1 = setInterval(() => {
            this.x += 10;
            if (this.y >= 450) {
                clearInterval(interval1);
            }
        }, 25);
    }


    flyLeft() {
        this.speedY = 30;
        this.applyGravity();
        let interval2 = setInterval(() => {
            this.x -= 10;
            if (this.y >= 450) {
                clearInterval(interval2);
            }
        }, 25);
    }


    playRotation() {
        if (!this.bottleHit) {
            this.playAnimation(this.IMAGES_ROTATION);
        }
    }

    playSplash() {
        if (this.bottleHit) {
            this.playAnimation(this.IMAGES_SPLASH);
        }
    }

}