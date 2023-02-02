class ThrowableObject extends MovableObject {
    bottleHit = false;
    bottleDamage = 20;

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
        this.height = 60;
        this.width = 50;
        this.otherDirection = otherDirection;
        this.throw();
        this.animte();
    }

    throw () {
        //THROW RIGHT IF CHAR LOOKS RIGHT SIDE  - OD FALSE
        if (!this.otherDirection) {
            this.speedY = 30;
            this.applyGravity();
            let interval1 = setInterval(() => {
                this.x += 10;
                if (this.y >= 450) {
                    clearInterval(interval1);
                }
            }, 25);
            //THROW LEFT IF CHAR LOOKS LEFT SIDE - OD TRUE
        } else if (this.otherDirection) {
            this.speedY = 30;
            this.applyGravity();
            let interval2 = setInterval(() => {
                this.x -= 10;
                if (this.y >= 450) {
                    clearInterval(interval2);
                }
            }, 25);
        }

    }



    animte() {
        setInterval(() => {

            if (!this.bottleHit) {
                this.playAnimation(this.IMAGES_ROTATION);

            } else if (this.bottleHit) {
                this.playAnimation(this.IMAGES_SPLASH);
            }

        }, 50);
    }


}