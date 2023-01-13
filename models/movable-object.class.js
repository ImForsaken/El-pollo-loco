//Class that defines all movable objects like character or chicken
class MovableObject {
    img;
    x = 120;
    y = 280;
    height = 150
    width = 100
    speed = 0.15;
    imageCache = {};
    currentImage = 0; //current loop itteration for animations
    otherDirection = false;


    loadImage(path) {
        this.img = new Image(); // creates a new image tag which exist only in JS til we add it to html
        this.img.src = path; //path is the Image path that can be dynamic since we use parameters
    }


    // loads multiple strings paths to imageCache
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        //TODO maybe change this.IMAGES_WALKING.length to images.length since images walking is the same as the parameter givin into the function ask DA coaches
        let i = this.currentImage % this.IMAGES_WALKING.length; // let i = 0 % 6; => 0, Rest 0
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    // moveRight() {
    //     this.x += this.speed;
    //     console.log('moveRight');
    // }

    moveLeft(speed) {
        setInterval(() => {
            this.x -= speed;
        }, 1000 / 60);
    }
}