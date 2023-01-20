class ThrowableObject extends MovableObject {

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y, otherDirection) {
        super();
        this.loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.otherDirection = otherDirection;
        this.throw();
    }

    throw () {
        //THROW RIGHT IF CHAR LOOKS RIGHT SIDE  - OD FALSE
        if (!this.otherDirection) {
            this.speedY = 30;
            this.applyGravity();
            setInterval(() => {
                this.x += 10;
                console.log(this.y)
                if (this.isAboveGround) {
                    this.playAnimation(this.IMAGES_SPLASH);

                }
            }, 25);
            //THROW LEFT IF CHAR LOOKS LEFT SIDE - OD TRUE
        } else if (this.otherDirection) {
            this.speedY = 30;
            this.applyGravity();
            setInterval(() => {
                this.x -= 10;
            }, 25);
        }

    }

}