class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x;
    statusBarHealth = new StatusbarHealth();
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


    //checks if a chicken is colliding with character by getting into the level variable which contains our enemys

    run2() {
        setInterval(() => {
            this.checkCollisions();
        }, 50);
    }


    //checks if bottle breaks
    run3() {
        setInterval(() => {
            this.checkThrowObjects();
        }, 300);
    }

    //TODO THIS:CHARACTER MAYBE DELETE AS PAREMTER SAME FOR THROWABLE CLASS
    checkThrowObjects() {
        if (this.keyboard.D && !this.character.otherDirection) {
            let bottle = new ThrowableObject(this.character.x + 50, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
        } else if (this.keyboard.D && this.character.otherDirection) {
            let bottle = new ThrowableObject(this.character.x - 10, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
        }
        if (this.throwableObjects.length > 0) {
            this.throwableObjects.forEach(bottle => {
                if (bottle.lastY >= 380) {
                    this.throwableObjects.splice(bottle, 1);
                }
            });
        }
    }


    //TODO IMPLEMENT THAT BOTTLES GET SPLICED
    checkBottleHeight() {
        this.throwableObjects.forEach(bottle => {
            if (bottle.lastY > 360) {
                this.throwableObjects.splice(bottle, 1);
            }
        });
    }


    //    console.log('Last Y', this.lastY, 'current Y', this.y, 'CALCULATED', (this.lastY - this.y)) Schaden des hühnchen abhängig davon machen ob man fällt berechneter wert muss < 0 sein

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt(this.character.immortalDuration) && enemy.energy > 0 && this.character.onTheGround()) {
                console.log('Char Y', this.character.y)
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }

        });
    }

    checkCharacterHitChicken() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && this.character.y <= 135 && !this.character.isHurt(this.character.immortalDuration)) {
                enemy.energy = 0;
                // setTimeout(() => {
                //     this.level.enemies.splice(enemy, 1);
                // }, 1300);
            }
        });
    }


    // checkChickenCollision() {
    //     this.level.enemies.forEach((enemy) => {
    //         if (this.throwableObjects.isColliding(enemy)) {
    //             enemy.energy == 0;
    //             console.log(enemy.energy);
    //         }
    //     });
    // }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) //clears the screen everytime draw is called
            //focus the camera on the character
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);



        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.throwableObjects);
        this.addObjectToMap(this.level.enemies);

        this.ctx.translate(-this.camera_x, 0); //Back
        // ----- space for fixed objects ------
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarHealth);
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
    }

    //array objects or single object which we add to world like chicken, character etc
    addObjectToMap(object) {
        object.forEach(o => {
            this.addToMap(o);
        });
    }

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