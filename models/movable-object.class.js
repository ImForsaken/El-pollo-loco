//Class that defines all movable objects like character or chicken
class MovableObject {
    img;
    x = 120;
    y = 250;
    height = 150
    width = 100

    loadImage(path) {
        this.img = new Image(); // creates a new image tag which exist only in JS til we add it to html
        this.img.src = path; //path is the Image path that can be dynamic since we use parameters
    }

    moveRight() {
        console.log('moveRight');
    }

    moveLeft() {
        console.log('moveLeft');
    }
}