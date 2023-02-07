let level1;

function initLevel() {


    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
        ], [
            new smallChicken(),
            new smallChicken(),
            new smallChicken(),
            new smallChicken(),
            new smallChicken(),
            new smallChicken(),

        ],
        new Endboss()

        , [
            new Coin(240, 145),
            new Coin(310, 100),
            new Coin(380, 145),
            new Coin(750, 145),
            new Coin(860, 125),
            new Coin(980, 125),
            new Coin(1150, 125),
            new Coin(1200, 165),
            new Coin(1500, 155),
            new Coin(1800, 125)
        ], [
            new Bottle(220, 355, 1),
            new Bottle(290, 355, 2),
            new Bottle(570, 355, 1),
            new Bottle(730, 355, 2),
            new Bottle(890, 355, 1),
            new Bottle(1150, 355, 2),
            new Bottle(1510, 355, 1),
            new Bottle(1690, 355, 2),
            new Bottle(1710, 355, 1),
            new Bottle(1910, 355, 2),
            new Bottle(2110, 355, 1),
        ], [
            new Cloud(0),
            new Cloud(700),
            new Cloud(1200),
            new Cloud(1600),
            new Cloud(2200),
            new Cloud(2600),
            new Cloud(3000),
        ], [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),


            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
        ],

    );
}