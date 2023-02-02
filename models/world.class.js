class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x;
    statusBarHealth = new StatusbarHealth();
    statusBarHealthBoss = new StatusbarHealthBoss();
    statusBarCoin = new StatusbarCoin();
    statusBarBottle = new StatusbarBottle();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; //this.canvas stands for the instance variable on top while the canvas behind = stands for the parameter in the constructor
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.run2();
        this.run3();
        this.run4();
    }

    //makes it possible for character object to access the variables of the world class object like keyboard
    //the class character get access to all variables of class World by setting the character instance variable world to "this" which contains all variables of class world
    setWorld() {
        this.character.world = this;
    }



    //checks if character jumps an hit chicken from top
    run() {
        setInterval(() => {
            // this.checkCollisions();
            this.checkCharacterHitChicken();
            // this.checkChickenCollision();
        }, 50);
    }


    //checks if a chicken is colliding with character or bottle by getting into the level variable which contains our enemys

    run2() {
        setInterval(() => {
            this.checkCollisions();
        }, 50);
    }


    //checks if bottle breaks
    run3() {
        setInterval(() => {
            this.checkThrowObjects();
        }, 350);
    }


    run4() {
        setInterval(() => {
            this.checkBottleCollision();
            this.checkIfBossIsInVision();
        }, 50);
    }



    checkIfBossIsInVision() {
        if (this.character.x >= 250 && !this.level.endboss.denyCheck) {
            console.log('IN VISION')
            this.level.endboss.inVision = true;
        }
        if (!this.level.endboss.isDead() && (this.character.x + (this.character.width / 2)) < this.level.endboss.x + (this.level.endboss.width / 2) - 500 && this.level.endboss.bossRageStart) {
            console.log('Boss runs left', this.level.endboss.x + (this.level.endboss.width / 2))
            this.level.endboss.otherDirection = false;

        } else if (!this.level.endboss.isDead() && this.character.x + (this.character.width / 2) > this.level.endboss.x + (this.level.endboss.width / 2) + 500 && this.level.endboss.bossRageStart) {
            console.log('Boss runs right', this.level.endboss.x + (this.level.endboss.width / 2))
            this.level.endboss.otherDirection = true;
        }
    }

    //TODO THIS:CHARACTER MAYBE DELETE AS PAREMTER SAME FOR THROWABLE CLASS
    checkThrowObjects() {
        if (this.keyboard.D && !this.character.otherDirection && !this.character.isDead()) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
        } else if (this.keyboard.D && this.character.otherDirection && !this.character.isDead()) {
            let bottle = new ThrowableObject(this.character.x - 10, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
        }
        // if (this.throwableObjects.length > 0) {
        //     this.throwableObjects.forEach(bottle => {
        //         if (bottle.lastY >= 430) {
        //             console.log('splice Bottle', this.throwableObjects)
        //             this.throwableObjects.splice(bottle, 1);
        //         }
        //     });
        // }
    }

    checkBottleCollision() {
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {

                if (bottle.isColliding(enemy) && !bottle.bottleHit && !enemy.isDead()) {
                    bottle.bottleHit = true;
                    enemy.hit(bottle.bottleDamage);
                    setTimeout(() => {
                        this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                        this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
                    }, 500);

                };
            });
            if (!this.level.endboss.isHurt(this.level.endboss.immortalDuration) && !bottle.bottleHit && !this.level.endboss.isDead() && bottle.isColliding(this.level.endboss)) {
                bottle.bottleHit = true;
                this.level.endboss.hit(bottle.bottleDamage);
                this.statusBarHealthBoss.setPercentage(this.level.endboss.energy);
            };
            if (bottle.lastY >= 340 && !bottle.bottleHit) {
                bottle.bottleHit = true;
                setTimeout(() => {
                    this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
                }, 500);
            };
        });
    };



    //checks if character gets dmg from chicken
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (!this.character.isAboveGround() && !this.character.isHurt(this.character.immortalDuration) && enemy.energy > 0 && this.character.isCollidingHorizontal(enemy)) {
                this.character.hit(enemy.chickenDamage);
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });
        //checks if character collides with endboss
        if (!this.character.isHurt(this.character.immortalDuration) && this.level.endboss.energy > 0 && this.character.isCollidingHorizontal(this.level.endboss)) {
            this.character.hit(this.level.endboss.endbossDamage);
            this.statusBarHealth.setPercentage(this.character.energy);
            this.level.endboss.isAttacking = true;
        } else {
            this.level.endboss.isAttacking = false;
        }
    };


    //Character hits chicken from top and kills         this.character.y <= 115
    checkCharacterHitChicken() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.isDead() && this.character.characterIsFalling() && !this.character.isHurt(this.character.immortalDuration) && this.character.isColliding(enemy)) {
                enemy.hit(this.character.charDmg);
                setTimeout(() => {
                    this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
                }, 500);
            }
        });
    };


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) //clears the screen everytime draw is called
            //focus the camera on the character
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);



        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.throwableObjects);
        this.addObjectToMap(this.level.enemies);
        this.addToMap(this.level.endboss);

        this.ctx.translate(-this.camera_x, 0); //Back
        // ----- space for fixed objects ------
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarHealthBoss);
        this.addToMap(this.statusBarCoin);
        this.ctx.translate(this.camera_x, 0); //Forwards


        //------ end space for fixed objects-----
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);


        //TODO
        //draw() will be called in the same speed as the user screen refreshrate caused by requestAnimationFrame
        let self = this; // this declaration can be ignored if we make requestAnimationFrame a anonymous function since calling function handles the "this" else then anonymous functions prob change later to anonymous function () =>
        requestAnimationFrame(function() {
            self.draw();
        });
    };

    //array objects or single object which we add to world like chicken, character etc
    addObjectToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    };

    //mo movableobject
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.drawObjectToMap(this.ctx);
        mo.drawFrameAroundObject(this.ctx);
        //TODO ADD THIS WHEN WE ADD DRAWCODRINATES
        // mo.drawCoordinates(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    };



    flipImage(mo) {
        //saves current canvas details so it can later be restored()
        this.ctx.save();
        //translates the character position by its width, so the character is turning around on its position, since we fliping the coordinates
        this.ctx.translate(mo.width, 0);
        //scale mirrors the coordination system so x starts on the upper right corner instead of left corner
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;

        //restore the point of save();
        this.ctx.restore();
    }

}