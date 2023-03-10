class Chicken extends MovableObject {
    y = 350;
    height = 80;
    width = 70;
    energy = 20;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    //here we load function we want the object to start with otherwise the chicken would not be animated
    constructor(k) {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 1000 + k + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animateChicken(this.speed, this.IMAGES_WALKING, 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
    }
}