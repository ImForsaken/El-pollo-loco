class smallChicken extends MovableObject {

    y = 367;
    height = 60;
    width = 60;
    energy = 20;
    chickenDamage = 20;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];


    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    //here we load function we want the object to start with otherwise the chicken would not be animated
    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 400; //number between 200- 700
        this.speed = 0.15 + Math.random() * 0.5;
        this.animateChicken(this.speed, this.IMAGES_WALKING, 'img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    }

    // animate() {
    //     setInterval(() => {
    //         this.moveLeft(this.speed);
    //     }, 1000 / 60);

    //     setInterval(() => {
    //         if (!this.speed == 0)
    //             this.playAnimation(this.IMAGES_WALKING);
    //     }, 200);


    //     setInterval(() => {
    //         if (this.isDead()) {
    //             this.speed = 0;
    //             this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
    //         }
    //     }, 50);

    // }


}