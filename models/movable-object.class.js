//Class that defines all movable objects like character or chicken
class MovableObject extends DrawableObject {


    speed = 0.15;
    speedY = 0;
    acceleration = 2.5;
    otherDirection = false;
    energy = 100;
    lastHit = 0;
    intervalID;
    isDamaged = false;
    immortalDuration = 0;
    lastY = 0;
    isAlreadyDead = false;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    //make pepe fall
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                // -= negatives the Number which makes y get higher since speedY is a negative number and gets converted to add because we -= y by speedY
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                this.lastY = this.y;
                // FÜR FLASCHE BESSER UM GENAUER ZU SEIN
                // console.log(this.y)
            }
        }, 1000 / 25);
    };



    isAboveGround() {
        if ((this instanceof ThrowableObject)) { //throwable object should always fall normaly fall instead of this.y < 360
            return true;
        } else {
            return this.y < 180;
        }
    };


    onTheGround() {
        return this.y >= 180
    }

    //TODO new variablen declaration for better syntax

    isColliding(mo) {
        return this.charRightCollideMoLeft(mo) &&
            this.charBottomCollideMoTop(mo) &&
            this.charLeftCollideMoRight(mo) &&
            this.charTopCollideWithMoBottom(mo);
    }


    //original colliding Function
    // isColliding2(mo) {
    //     return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
    //         this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
    //         this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
    //         this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    // }


    //Colliding functions seperated for better syntax


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
    }


    isBottomSideChar() {
        return this.y + this.height - this.offset.bottom;
    };


    topSideFrom(mo) {
        return mo.y + mo.offset.top;
    };


    charLeftCollideMoRight(mo) {
        return this.isLeftSideChar() < this.rightSideFrom(mo);
    }


    isLeftSideChar() {
        return this.x + this.offset.left;
    }


    rightSideFrom(mo) {
        return mo.x + mo.width - mo.offset.right;
    }


    charTopCollideWithMoBottom(mo) {
        return this.isTopSideChar() < this.bottomSideFrom(mo);
    }


    isTopSideChar() {
        return this.y + this.offset.top;
    }


    bottomSideFrom(mo) {
        return mo.y + mo.height - mo.offset.bottom;
    }


    hit() {
        this.energy -= 20;
        //maybe switch -= energy calculation to else since hits will be always calculated
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    //checks if character is hurt starting by 0secs if character is colliding prob make a booleon to make animation appear only once
    isHurt(immortalDuration) {
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in seconds
        return timepassed < immortalDuration;
    }




    isDead() {
        return this.energy == 0;
    }


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
        this.x -= speed;
    };

    jump() {
        this.speedY = 30;
    };
}