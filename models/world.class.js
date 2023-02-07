class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusbarHealth();
    statusBarHealthBoss = new StatusbarHealthBoss();
    statusBarCoin = new StatusbarCoin();
    statusBarBottle = new StatusbarBottle();
    throwableObjects = [];
    gamePaused = false;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; //this.canvas stands for the instance variable on top while the canvas behind = stands for the parameter in the constructor
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.run2();
    }


    //makes it possible for character object to access the variables of the world class object like keyboard
    //the class character get access to all variables of class World by setting the character instance variable world to "this" which contains all variables of class world
    setWorld() {
        this.character.world = this;
    }


    pause() {
        this.gamePaused = true;
    };



    start() {
        this.gamePaused = true;
    };


    //checks if character jumps an hit chicken from top
    run() {
        setInterval(() => {
            this.checkCharactrerHitNormalChickenFromTop();
            this.checkCharacterHitSmallChickenFromTop();
            this.checkCollisions();
            this.checkBottleCollision();
            this.checkIfBossIsInVision();
            this.checkBottlePickUp();
            this.checkCoinPickUp();
            this.checkIfCharacterDeservHeal();
            this.checkKeyPress();
        }, 50);
    }


    //checks when last key was pressed and set timer to calculate characters idle animation start
    checkKeyPress() {
        if (this.keyboard.LEFT || this.keyboard.RIGHT || this.keyboard.UP || this.keyboard.DOWN || this.keyboard.SPACE || this.keyboard.D) {
            this.character.lastKeyPress = new Date().getTime();
        }
    }


    //checks if a chicken is colliding with character or bottle by getting into the level variable which contains our enemys

    //checks if bottle breaks
    run2() {
        setInterval(() => {
            this.checkThrowObjects();
        }, 350);
    }


    checkIfBossIsInVision() {
        if (!this.character.gamePaused && this.character.x >= 2000 && !this.level.endboss.denyCheck) {
            // console.log('IN VISION')
            this.level.endboss.inVision = true;
        }
        if (!this.level.endboss.isDead() && (this.character.x + (this.character.width / 2)) < this.level.endboss.x + (this.level.endboss.width / 2) - 600 && this.level.endboss.bossRageStart) {
            this.level.endboss.otherDirection = false;

        } else if (!this.level.endboss.isDead() && this.character.x + (this.character.width / 2) > this.level.endboss.x + (this.level.endboss.width / 2) + 600 && this.level.endboss.bossRageStart) {
            this.level.endboss.otherDirection = true;
        }
    }


    //TODO THIS:CHARACTER MAYBE DELETE AS PAREMTER SAME FOR THROWABLE CLASS
    checkThrowObjects() {
        if (!this.character.gamePaused && this.keyboard.D && !this.character.otherDirection && !this.character.isDead() && this.character.bottleInventoryCounter > 0) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100, this.character.otherDirection);
            this.character.bottleInventoryCounter--;
            this.character.bottleAmount -= 20;
            this.statusBarBottle.setPercentage(this.character.bottleAmount);
            this.throwableObjects.push(bottle);
        } else if (!this.character.gamePaused && this.keyboard.D && this.character.otherDirection && !this.character.isDead() && this.character.bottleInventoryCounter > 0) {
            let bottle = new ThrowableObject(this.character.x - 10, this.character.y + 100, this.character.otherDirection);
            this.character.bottleInventoryCounter--;
            this.character.bottleAmount -= 20;
            this.statusBarBottle.setPercentage(this.character.bottleAmount);
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


    checkBottlePickUp() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle) && this.character.bottleInventoryCounter <= 4) {
                this.character.bottleInventoryCounter++;
                this.character.bottleAmount += 20;
                this.statusBarBottle.setPercentage(this.character.bottleAmount);
                this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
            }
        })

    }


    checkCoinPickUp() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                if (this.character.coinAmount < 100) {
                    this.level.coins.splice(this.level.coins.indexOf(coin), 1);
                    this.character.coinAmount += 20;
                    this.statusBarCoin.setPercentage(this.character.coinAmount);
                }
            }
        });
    }


    checkIfCharacterDeservHeal() {
        if (this.character.coinAmount == 100 && this.character.energy < 100) {
            this.character.coinAmount = 0;
            this.character.energy += 20;
            this.statusBarCoin.setPercentage(this.character.coinAmount);
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }


    checkBottleCollision() {
        this.throwableObjects.forEach((bottle) => {
            this.level.normalChicken.forEach((enemy) => {

                if (bottle.isColliding(enemy) && !bottle.bottleHit && !enemy.isDead()) {
                    bottle.bottleHit = true;
                    enemy.hit(bottle.bottleDamage);
                    setTimeout(() => {
                        this.level.normalChicken.splice(this.level.normalChicken.indexOf(enemy), 1);
                        this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
                    }, 500);

                };
            });
            this.level.smallChicken.forEach((enemy) => {

                if (bottle.isColliding(enemy) && !bottle.bottleHit && !enemy.isDead()) {
                    bottle.bottleHit = true;
                    enemy.hit(bottle.bottleDamage);
                    setTimeout(() => {
                        this.level.smallChicken.splice(this.level.smallChicken.indexOf(enemy), 1);
                        this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
                    }, 500);

                };
            });
            if (!this.level.endboss.isHurt(this.level.endboss.immortalDuration) && this.level.endboss.bossRageStart && !bottle.bottleHit && !this.level.endboss.isDead() && bottle.isColliding(this.level.endboss)) {
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




    //checks if character collides with small chicken
    checkCollisions() {
        this.level.normalChicken.forEach((enemy) => {
            if (!this.character.isAboveNormalChicken() && !this.character.isHurt(this.character.immortalDuration) && enemy.energy > 0 && this.character.isCollidingHorizontal(enemy)) {
                this.character.hit(enemy.chickenDamage);
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });

        //checks if character collides with small chicken
        this.level.smallChicken.forEach((enemy) => {
            if (!this.character.isAboveSmallChicken() && !this.character.isHurt(this.character.immortalDuration) && enemy.energy > 0 && this.character.isCollidingHorizontal(enemy)) {
                this.character.hit(enemy.chickenDamage);
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });

        //checks if character collides with endboss
        if (!this.character.isHurt(this.character.immortalDuration) && this.level.endboss.energy > 0 && this.character.isCollidingHorizontal(this.level.endboss) && !this.character.isDead()) {
            this.level.endboss.isAttacking = true;
            this.character.hit(this.level.endboss.endbossDamage);
            this.statusBarHealth.setPercentage(this.character.energy);
        } else if (!this.character.isHurt(this.character.immortalDuration)) {
            this.level.endboss.isAttacking = false;
        }
    };


    //Character hits chicken from top and kills         this.character.y <= 115
    checkCharactrerHitNormalChickenFromTop() {
        this.level.normalChicken.forEach((enemy) => {
            if (!enemy.isDead() && this.character.characterIsFalling() && !this.character.isHurt(this.character.immortalDuration) && this.character.isColliding(enemy)) {
                enemy.hit(this.character.charDmg);
                setTimeout(() => {
                    this.level.normalChicken.splice(this.level.normalChicken.indexOf(enemy), 1);
                }, 500);
            }
        });
    };


    checkCharacterHitSmallChickenFromTop() {
        this.level.smallChicken.forEach((enemy) => {
            if (!enemy.isDead() && this.character.characterIsFalling() && !this.character.isHurt(this.character.immortalDuration) && this.character.isColliding(enemy)) {
                enemy.hit(this.character.charDmg);
                setTimeout(() => {
                    this.level.smallChicken.splice(this.level.smallChicken.indexOf(enemy), 1);
                }, 500);
            }
        });
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) //clears the screen everytime draw is called
            //focus the camera on the character
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);



        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.bottles);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.throwableObjects);
        this.addObjectToMap(this.level.normalChicken);
        this.addObjectToMap(this.level.smallChicken);
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
        // mo.drawFrameAroundObject(this.ctx);
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