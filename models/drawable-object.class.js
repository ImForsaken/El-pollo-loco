class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0; //current loop itteration for animations
    x = 120;
    y = 280;
    height = 150
    width = 100



    //only draws a border/frame around the object if its an instance of Chicken or Character
    drawFrameAroundObject(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, (this.width - this.offset.left) - this.offset.right, this.height - this.offset.top);
            ctx.stroke();
        }
    }

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




}