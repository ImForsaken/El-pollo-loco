class Level {
    normalChicken;
    smallChicken;
    endboss;
    clouds;
    backgroundObjects;
    statusbar;
    coins;
    bottles;
    level_end_x = 2800;

    constructor(normalChicken, smallChicken, endboss, coins, bottles, clouds, backgroundObjects, statusbar) {
        this.normalChicken = normalChicken;
        this.smallChicken = smallChicken;
        this.endboss = endboss;
        this.coins = coins
        this.bottles = bottles
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.statusbar = statusbar;
    }
}