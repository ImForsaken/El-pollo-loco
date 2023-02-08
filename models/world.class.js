class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    camera_x = 0;
    statusBarHealth = new StatusbarHealth();
    statusBarHealthBoss = new StatusbarHealthBoss();
    statusBarCoin = new StatusbarCoin();
    statusBarBottle = new StatusbarBottle();
    throwableObjects = [];
    gameStarted = false;
    gamePaused = false;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas; //this.canvas stands for the instance variable on top while the canvas behind = stands for the parameter in the constructor
        this.draw();
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
        this.gamePaused = false;
    };

    checkGameEnd() {
        this.gameEnding();
    }


    run() {
        setInterval(() => {
            this.characterJumpsOn(this.level.normalChicken);
            this.characterJumpsOn(this.level.smallChicken);
            this.checkCollisions();
            this.checkBottleCollision();
            this.checkBossCordinates();
            this.checkBottlePickUp();
            this.checkCoinPickUp();
            this.healCharacterWithCoins();
            this.lastKeyPressTimer();
            this.checkGameEnd();
        }, 50);
    }

    //checks if a chicken is colliding with character or bottle by getting into the level variable which contains our enemys

    //checks if bottle breaks
    run2() {
        setInterval(() => {
            this.checkThrowObjects();
        }, 250);
    }


    checkBossCordinates() {
        this.startEndbossBattle();
        this.checkIfBossIsLeftOrRight();
    }




    //TODO THIS:CHARACTER MAYBE DELETE AS PAREMTER SAME FOR THROWABLE CLASS
    checkThrowObjects() {
        this.throwBottleRight();
        this.throwBottleLeft();
    }


    checkBottlePickUp() {
        this.checkIfCharacrterCollidesBottle();
    }


    checkCoinPickUp() {
        this.charPicksUpCoin();
    }


    healCharacterWithCoins() {
        this.healCharacter();
    }


    checkBottleCollision() {
        this.characterThrowBottle();
    };


    //checks if character collides with small chicken
    checkCollisions() {
        this.checkNormalChickenCollision();
        this.checkSmallChickenCollision();
        this.checkEndbossCollision();
    };


    //Character hits chicken from top and kills         this.character.y <= 115

    characterJumpsOn(chickenVersion) {
        this.checkWhichChickenIsDefeatedByJump(chickenVersion);
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
        if (this.level.endboss.alertLoop >= 1) {
            this.addToMap(this.statusBarHealthBoss);
        }
        this.addToMap(this.statusBarCoin);
        this.ctx.translate(this.camera_x, 0); //Forwards


        //------ end space for fixed objects-----
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);


        //TODO
        //draw() will be called in the same speed as the user screen refreshrate caused by requestAnimationFrame
        let self = this; // this declaration can be ignored if we make requestAnimationFrame a anonymous function since calling function handles the "this" else then anonymous functions prob change later to anonymous function () =>
        requestAnimationFrame(() => {
            this.draw();
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



    //help function

    charPicksUpCoin() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin) && this.character.coinAmount < 100) {
                this.pickCoinUp(coin);
            }
        });
    }


    pickCoinUp(coin) {
        this.level.coins.splice(this.level.coins.indexOf(coin), 1);
        this.character.coinAmount += 20;
        this.statusBarCoin.setPercentage(this.character.coinAmount);
    }

    checkIfCharacrterCollidesBottle() {
        this.level.bottles.forEach(bottle => {
            if (this.checkInventorySpace(bottle)) {
                this.pickBottleUp(bottle);
            }
        })
    }

    checkInventorySpace(bottle) {
        return this.character.isColliding(bottle) && this.character.bottleInventoryCounter <= 4
    }

    pickBottleUp(bottle) {
        this.character.bottleInventoryCounter++;
        this.character.bottleAmount += 20;
        this.statusBarBottle.setPercentage(this.character.bottleAmount);
        this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
    }

    healCharacter() {
        if (this.checkIfCharacterDeservHeal()) {
            this.healCharacterNow();
        }
    }

    checkIfCharacterDeservHeal() {
        return this.character.coinAmount == 100 && this.character.energy < 100
    }

    healCharacterNow() {
        this.character.coinAmount = 0;
        this.character.energy += 20;
        this.statusBarCoin.setPercentage(this.character.coinAmount);
        this.statusBarHealth.setPercentage(this.character.energy);
    }


    startEndbossBattle() {
        if (this.checkIfBossIsInVision()) {
            // console.log('IN VISION')
            this.level.endboss.inVision = true;
        }
    }

    checkIfBossIsInVision() {
        return !this.character.gamePaused && this.character.x >= 2000 && !this.level.endboss.denyCheck;
    }


    checkIfBossIsLeftOrRight() {
        this.bossIsRightSide();
        this.bossIsLeftSide();
    }

    bossIsRightSide() {
        if (this.checkIfBossIsRightSide()) {
            this.level.endboss.otherDirection = false;
        }
    }

    bossIsLeftSide() {
        if (this.checkIfBossIsLeftSide()) {
            this.level.endboss.otherDirection = true;
        }
    }


    checkIfBossIsRightSide() {
        return !this.level.endboss.isDead() && (this.character.x + (this.character.width / 2)) < this.level.endboss.x + (this.level.endboss.width / 2) - 600 && this.level.endboss.bossRageStart;
    }

    checkIfBossIsLeftSide() {
        return !this.level.endboss.isDead() && this.character.x + (this.character.width / 2) > this.level.endboss.x + (this.level.endboss.width / 2) + 600 && this.level.endboss.bossRageStart;
    }


    //checks when last key was pressed and set timer to calculate characters idle animation start
    lastKeyPressTimer() {
        this.pressKey();
    }

    pressKey() {
        this.pressKeyToSetIdleTimer();
    }

    pressKeyToSetIdleTimer() {
        if (this.checkWhichKeyIsPressed()) {
            this.character.lastKeyPress = new Date().getTime();
        }
    }

    checkWhichKeyIsPressed() {
        return keyboard.LEFT || keyboard.RIGHT || keyboard.UP || keyboard.DOWN || keyboard.SPACE || keyboard.D
    }


    gameEnding() {
        if (this.gameEndsWhen()) {
            this.initGameEnd();
        }
    }

    gameEndsWhen() {
        return this.character.isDead() || this.level.endboss.isDead() && !gameEnd;
    }

    initGameEnd() {
        setTimeout(() => {
            gameEnd = true;
            for (let i = 1; i < 9999; i++) window.clearInterval(i);
            gameEndScreen();
        }, 4000);
    }

    checkWhichChickenIsDefeatedByJump(chickenVersion) {
        chickenVersion.forEach((enemy) => {
            this.characterHitsChickenFromTop(enemy, chickenVersion);
        });
    }

    throwBottleRight() {
        if (this.checkIfBottleFlyRightDirection()) {
            this.throwBottleTo(this.character.x + 50);
        }
    }

    throwBottleLeft() {
        if (this.checkIfBottleFlyLeftDirection()) {
            this.throwBottleTo(this.character.x - 10);
        }
    }

    characterThrowBottle() {
        this.throwableObjects.forEach((bottle) => {
            this.characterHitsEnemysWith(bottle);
        });
    }

    characterHitsEnemysWith(bottle) {
        this.bottleHitSmallAndNormalChicken(bottle);
        this.bottleHitEndboss(bottle);
        this.bottleBreaksOnGround(bottle);
    }


    bottleHitSmallAndNormalChicken(bottle) {
        this.level.normalChicken.forEach((enemy) => {
            this.bottleHitChicken(bottle, enemy, this.level.normalChicken);
        });
        this.level.smallChicken.forEach((enemy) => {
            this.bottleHitChicken(bottle, enemy, this.level.smallChicken);
        });
    }

    bottleHitEndboss(bottle) {
        if (this.checkBossDamageWorthy(bottle)) {
            bottle.bottleHit = true;
            this.level.endboss.hit(bottle.bottleDamage);
            this.statusBarHealthBoss.setPercentage(this.level.endboss.energy);
        };
    }



    bottleBreaksOnGround(bottle) {
        if (!this.gamePaused && bottle.lastY >= 340 && !bottle.bottleHit) {
            bottle.bottleHit = true;
            setTimeout(() => {
                this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
            }, 500);
        };
    }


    checkNormalChickenCollision() {
        this.level.normalChicken.forEach((enemy) => {
            if (this.checkIfNormalChickenCanDoDamageToCharacter(enemy)) {
                this.calculateEnemyDamageToCharacter(enemy);
            }
        });
    }

    checkSmallChickenCollision() {
        this.level.smallChicken.forEach((enemy) => {
            if (this.checkIfSmallChickenCanDoDamageToCharacter(enemy)) {
                this.calculateEnemyDamageToCharacter(enemy);
            }
        });
    }


    checkEndbossCollision() {
        if (this.checkIfEndbossCanDoDamageToCharacter()) {
            this.calculateEnemyDamageToCharacter(this.level.endboss);
            this.level.endboss.isAttacking = true;
        } else if (this.checkIfEndbossIsAttackingCharacter()) {
            this.level.endboss.isAttacking = false;
        }
    }



    //throws bottle to transfered direction
    throwBottleTo(direction) {
        let bottle = new ThrowableObject(direction, this.character.y + 100, this.character.otherDirection);
        this.character.bottleInventoryCounter--;
        this.character.bottleAmount -= 20;
        this.statusBarBottle.setPercentage(this.character.bottleAmount);
        this.throwableObjects.push(bottle);
    }


    //checks if Chicken gets hit by bottle + splices the bottle out of inventory
    bottleHitChicken(bottle, enemy, chickenVersion) {
        if (!this.gamePaused && bottle.isColliding(enemy) && !bottle.bottleHit && !enemy.isDead()) {
            bottle.bottleHit = true;
            enemy.hit(bottle.bottleDamage);
            setTimeout(() => {
                chickenVersion.splice(chickenVersion.indexOf(enemy), 1);
                this.throwableObjects.splice(this.throwableObjects.indexOf(bottle), 1);
            }, 500);
        };
    }


    //function to check if Character defeats chicken by jumping
    characterHitsChickenFromTop(enemy, chickenVersion) {
        if (this.checkIfCharacterHitsChickenFromTop(enemy)) {
            enemy.hit(this.character.charDmg);
            setTimeout(() => {
                chickenVersion.splice(chickenVersion.indexOf(enemy), 1);
            }, 500);
        }
    }


    //function that calculate the damage from chicken to Character
    calculateEnemyDamageToCharacter(enemy) {
        console.log('chicken do dmg')
        this.character.hit(enemy.chickenDamage);
        this.statusBarHealth.setPercentage(this.character.energy);
    }


    checkBossDamageWorthy(bottle) {
        return !this.gamePaused && !this.level.endboss.isHurt(this.level.endboss.immortalDuration) && this.level.endboss.bossRageStart && !bottle.bottleHit && !this.level.endboss.isDead() && bottle.isColliding(this.level.endboss)
    }

    checkIfNormalChickenCanDoDamageToCharacter(enemy) {
        return !this.gamePaused && !this.character.isAboveNormalChicken() && !this.character.isHurt(this.character.immortalDuration) && enemy.energy > 0 && this.character.isCollidingHorizontal(enemy)
    }
    checkIfSmallChickenCanDoDamageToCharacter(enemy) {
        return !this.gamePaused && !this.character.isAboveSmallChicken() && !this.character.isHurt(this.character.immortalDuration) && enemy.energy > 0 && this.character.isCollidingHorizontal(enemy)
    }

    checkIfEndbossCanDoDamageToCharacter() {
        return !this.gamePaused && !this.character.isHurt(this.character.immortalDuration) && !this.level.endboss.isHurt(this.level.endboss.immortalDuration) && this.level.endboss.energy > 0 && this.character.isCollidingHorizontal(this.level.endboss) && !this.character.isDead()
    }

    checkIfEndbossIsAttackingCharacter() {
        return !this.gamePaused && !this.character.isHurt(this.character.immortalDuration);
    }


    checkIfCharacterHitsChickenFromTop(enemy) {
        return !this.gamePaused && !enemy.isDead() && this.character.characterIsFalling() && !this.character.isHurt(this.character.immortalDuration) && this.character.isColliding(enemy);
    }

    checkIfBottleFlyRightDirection() {
        return !this.character.gamePaused && keyboard.D && !this.character.otherDirection && !this.character.isDead() && this.character.bottleInventoryCounter > 0;
    }

    checkIfBottleFlyLeftDirection() {
        return !this.character.gamePaused && keyboard.D && this.character.otherDirection && !this.character.isDead() && this.character.bottleInventoryCounter > 0;
    }


}