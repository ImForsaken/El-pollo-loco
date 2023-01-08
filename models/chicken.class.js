class Chicken extends MovableObject {
    constructor() {
        //noch mal das Video zum super() anschauen um zu verstehen ob variablen innerhalb von super geschrieben werden müssen oder nicht da junus sagt das wir super nur für methoden benötigen
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500; //number between 200- 700
    }
}