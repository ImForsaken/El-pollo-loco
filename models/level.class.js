class Level {
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    statusbar;
    coin;
    bottles;
    level_end_x = 2200;

    constructor(enemies, endboss, coin, bottles, clouds, backgroundObjects, statusbar) {
        this.enemies = enemies;
        this.endboss = endboss;
        this.coin = coin
        this.bottles = bottles
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.statusbar = statusbar;
    }
}