class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0; //current loop itteration for animations
    x = 120;
    y = 280;
    height = 150
    width = 100
    deadLoop = 0;
    alertLoop = 0;
    gameStart = true;
    gameEnd = false;
    gamePaused = false;



    //only draws a border/frame around the object if its an instance of Chicken or Character
    drawFrameAroundObject(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Bottle || this instanceof Coin || this instanceof smallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Bottle || this instanceof Coin || this instanceof smallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, (this.width - this.offset.left) - this.offset.right, this.height - this.offset.top - this.offset.bottom);
            ctx.stroke();
        }
    }

    //TODO DRAW THE HITS ON CANVAS
    // drawCoordinates(ctx){
    //     //instanceof limits this function on specified classes Character, Chicken and Endboss
    //     if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin) {
    //        ctx.font = "48px serif";
    //         ctx.fillText(${this.x}, ${this.y}, this.x, this.y);
    //     }
    //   }

    loadImage(path) {
        this.img = new Image(); // creates a new image tag which exist only in JS til we add it to html
        this.img.src = path; //path is the Image path that can be dynamic since we use parameters
    };


    // loads multiple strings paths to imageCache
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    drawObjectToMap(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };


    //setPercentage(100);
    setPercentage(percentage) {
        this.percentage = percentage; // => 0....5
        let path = this.IMAGES[this.resolveImageIndex()]
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}