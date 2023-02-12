//Class that defines all movable objects like character or chicken
class MovableObject extends DrawableObject {
    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    lastKeyPress;
    lastBottleThrown = 0;
    intervalID;
    isDamaged = false;
    immortalDuration = 0;
    lastY = 0;
    isAlreadyDead = false;
    chickenDamage = 20;
    chickenHit_sound = new Audio('audio/chicken_hit.mp3');
    bottleSplash_sound = new Audio('audio/brokenBottle.mp3');

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };


    //make pepe fall
    applyGravity() {
        setInterval(() => {
            if (!world.gamePaused && this.isAboveGround() || this.speedY > 0) {
                this.characterJumpAndFalls();
                this.checkIfCharLandsOnGround();
            }
        }, 1000 / 25);
    };

    characterJumpAndFalls() {
        // -= negatives the Number which makes y get higher since speedY is a negative number and gets converted to add because we -= y by speedY
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        this.lastY = this.y;
    }


    checkIfCharLandsOnGround() {
        if (!this.isAboveGround()) {
            this.speedY = 0;
        }
    }

    characterIsFalling() {
        return this.speedY < 0;
    };


    isAboveGround() {
        if ((this instanceof ThrowableObject)) {
            return true;
        } else {
            return this.y < 180;
        }
    };


    isAboveNormalChicken() {
        return this.y + this.height - this.offset.bottom <= 340
    };


    isAboveSmallChicken() {
        return this.y + this.height - this.offset.bottom <= 360;
    };


    isColliding(mo) {
        return this.charRightCollideMoLeft(mo) &&
            this.charBottomCollideMoTop(mo) &&
            this.charLeftCollideMoRight(mo) &&
            this.charTopCollideWithMoBottom(mo);
    };


    //Colliding functions seperated for better syntax
    isCollidingHorizontal(mo) {
        return this.charRightCollideMoLeft(mo) && this.charLeftCollideMoRight(mo);
    };


    isCollidingVerticaly(mo) {
        return this.charBottomCollideMoTop(mo) && this.charTopCollideWithMoBottom(mo);
    };


    charRightCollideMoLeft(mo) {
        return this.isRightSideChar() > this.leftSideFrom(mo);
    };


    isRightSideChar() {
        return this.x + this.width - this.offset.right;
    };


    leftSideFrom(mo) {
        return mo.x + mo.offset.left;
    };


    charBottomCollideMoTop(mo) {
        return this.isBottomSideChar() > this.topSideFrom(mo);
    };


    isBottomSideChar() {
        return this.y + this.height - this.offset.bottom;
    };


    topSideFrom(mo) {
        return mo.y + mo.offset.top;
    };


    charLeftCollideMoRight(mo) {
        return this.isLeftSideChar() < this.rightSideFrom(mo);
    };


    isLeftSideChar() {
        return this.x + this.offset.left;
    };


    rightSideFrom(mo) {
        return mo.x + mo.width - mo.offset.right;
    };


    charTopCollideWithMoBottom(mo) {
        return this.isTopSideChar() < this.bottomSideFrom(mo);
    };


    isTopSideChar() {
        return this.y + this.offset.top;
    };


    bottomSideFrom(mo) {
        return mo.y + mo.height - mo.offset.bottom;
    };


    hit(dmg) {
        this.energy -= dmg;
        //maybe switch -= energy calculation to else since hits will be always calculated
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    };


    //checks if character is hurt starting by 0secs if character is colliding prob make a booleon to make animation appear only once
    isHurt(immortalDuration) {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in seconds
        return timepassed < immortalDuration;
    };


    characterStartIdling(idleTime) {
        let timepassed = new Date().getTime() - this.lastKeyPress; // difference in ms
        timepassed = timepassed / 1000; // difference in seconds
        return timepassed > idleTime;
    };


    characterStartLongIdling(idleTime) {
        let timepassed = new Date().getTime() - this.lastKeyPress; // difference in ms
        timepassed = timepassed / 1000; // difference in seconds
        return timepassed > idleTime;
    };


    //controlls that bottles can only be thrown every 0.5 seconds after last throwing bottle
    throwBottleCooldown(throwTimer) {
        let timepassed = new Date().getTime() - this.lastBottleThrown;
        timepassed = timepassed / 1000;
        return timepassed > throwTimer;
    }


    isDead() {
        return this.energy == 0;
    };


    playAnimation(images) {
        let i = this.currentImage % images.length; // let i = 0 % 6; => 0, Rest 0
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };


    moveRight() {
        //walk to right position by increasing x by speed
        this.x += this.speed;

    };


    moveLeft(speed) {
        //walk to left position by decreasing x by speed
        if (!world.gamePaused) {
            this.x -= speed;
        }
    };


    jump() {
        if (!world.gamePaused) {
            this.speedY = 30;
        }
    };


    animateChicken(speed, imagesWalking, ImageDead) {
        this.moveChickenToLeft(speed);
        this.playChickenMove(imagesWalking);
        this.playChickenDead(ImageDead)
    }


    moveChickenToLeft(speed) {
        setInterval(() => {
            if (!world.gamePaused && !this.isDead()) {
                this.moveLeft(speed);
            }
        }, 1000 / 60);
    }


    playChickenMove(imagesWalking) {
        setInterval(() => {
            if (this.checkIfChickenIsMoving())
                this.playAnimation(imagesWalking);
        }, 200);
    }


    playChickenDead(ImageDead) {
        setInterval(() => {
            if (this.isDead() && !world.gamePaused) {
                this.speed = 0;
                this.loadImage(ImageDead);
            }
        }, 50);
    }


    checkIfChickenIsMoving() {
        return !this.speed == 0 && !world.gamePaused && !this.isDead();
    }
}