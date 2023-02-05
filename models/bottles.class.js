class Bottle extends DrawableObject {

    height = 80;
    width = 80;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    }
}