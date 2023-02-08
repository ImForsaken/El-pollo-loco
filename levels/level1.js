let level1;

function initLevel() {


    level1 = new Level(
        [
            new Chicken(400),
            new Chicken(600),
            new Chicken(700),
            new Chicken(800),
            new Chicken(900),
        ], [
            new smallChicken(100),
            new smallChicken(360),
            new smallChicken(450),
            new smallChicken(550),
            new smallChicken(670),
            new smallChicken(870),
            new smallChicken(900),
            new smallChicken(1050),

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
            new Bottle(390, 355, 2),
            new Bottle(560, 355, 1),
            new Bottle(850, 355, 2),
            new Bottle(1190, 355, 1),
            new Bottle(1410, 355, 2),
            new Bottle(1560, 355, 1),
            new Bottle(1690, 355, 2),
            new Bottle(1810, 355, 1),
            new Bottle(1960, 355, 2),
            new Bottle(2210, 355, 1),
        ], [
            new Cloud(0),
            new Cloud(700),
            new Cloud(1200),
            new Cloud(1600),
            new Cloud(2200),
            new Cloud(2600),
            new Cloud(3000),
            new Cloud(3400),
            new Cloud(3800),
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

            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
        ],

    );
}