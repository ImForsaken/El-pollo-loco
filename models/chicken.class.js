class Chicken extends MovableObject {
    y = 350;
    height = 80;
    width = 70;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];


    //here we load function we want the object to start with otherwise the chicken would not be animated
    constructor() {
        //TODO noch mal das Video zum super() anschauen um zu verstehen ob variablen innerhalb von super geschrieben werden müssen oder nicht da junus sagt das wir super nur für methoden benötigen
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 300 + Math.random() * 400; //number between 200- 700
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft(this.speed);
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}