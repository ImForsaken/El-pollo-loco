let canvas = document.getElementById('canvas');
let world;
let keyboard;
let fullscreen = false;
let gameEnd = false;

function init() {
    gameEnd = false;
    initLevel();
    addEventListeners();
    keyboard = new Keyboard();
    world = new World(canvas);
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('gameIntro').style.display = 'none';
    document.getElementById('gameInfo').style.display = 'none';
    document.getElementById('pausePlayButton').style.display = 'unset';
    document.getElementById('fullscreenButton').style.display = 'unset';
    document.getElementById('gameOutro').style.display = 'none';
}

function gameEndScreen() {
    document.getElementById('gameOutro').style.display = 'unset';
    startButton = document.getElementById('startButton');
    startButton.style.display = 'unset';
    startButton.innerHTML = 'Start again!';

}


function showInfo() {
    const gameInfo = document.getElementById('gameInfo');
    if (gameInfo.style.display === '' || gameInfo.style.display === 'none') {
        gameInfo.style.display = 'flex';
        if (world && !gameEnd) {
            world.pause();
            document.getElementById('pausePlayButton').src = 'img/9_intro_outro_screens/playButton.png';
            console.log('game paused')
        }
    } else {
        gameInfo.style.display = 'none';
        if (world && !gameEnd) {
            world.start();
            document.getElementById('pausePlayButton').src = 'img/9_intro_outro_screens/pauseButton.png';
            console.log('game started')
        }
    }
}


function pausePlaygame() {
    const gameInfo = document.getElementById('gameInfo');
    if (world.gamePaused || gameInfo.style.display === 'flex') {
        world.start();
        gameInfo.style.display = 'none';
        document.getElementById('pausePlayButton').src = 'img/9_intro_outro_screens/pauseButton.png';
        console.log('game started');
    } else if (!world.gamePaused) {
        console.log('game paused');
        document.getElementById('pausePlayButton').src = 'img/9_intro_outro_screens/playButton.png';
        world.pause();
    }
}


function fullscreenMode() {
    let element = document.getElementById('gameScreen');
    if (!fullscreen) {
        document.getElementById('fullscreenButton').src = 'img/9_intro_outro_screens/exitFullscreen.png';
        fullscreen = true;
        enterFullscreen(element);
    } else if (fullscreen) {
        document.getElementById('fullscreenButton').src = 'img/9_intro_outro_screens/joinFullscreen.png';
        fullscreen = false;
        exitFullscreen();
    }

}


function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) { // for IE11
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) { // iOS Safari
        element.webkitRequestFullscreen();
    }
}



function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}


function addEventListeners() {
    //TODO Probaly change if statements to else if for better performance
    window.addEventListener('keydown', (e) => {
        //TODO probaly change to .key or .code since keyCode is deprecated and not supported in few browsers
        if (e.keyCode == 39) {
            keyboard.RIGHT = true;
        } else if (e.keyCode == 37) {
            keyboard.LEFT = true;
        } else if (e.keyCode == 38) {
            keyboard.UP = true;
        } else if (e.keyCode == 40) {
            keyboard.DOWN = true;
        } else if (e.keyCode == 32) {
            keyboard.SPACE = true;
        } else if (e.keyCode == 68) {
            keyboard.D = true;
        }
    });

    window.addEventListener('keyup', (e) => {
        //TODO probaly change to .key or .code since keyCode is deprecated and not supported in few browsers
        if (e.keyCode == 39) {
            keyboard.RIGHT = false;
        } else if (e.keyCode == 37) {
            keyboard.LEFT = false;
        } else if (e.keyCode == 38) {
            keyboard.UP = false;
        } else if (e.keyCode == 40) {
            keyboard.DOWN = false;
        } else if (e.keyCode == 32) {
            keyboard.SPACE = false;
        } else if (e.keyCode == 68) {
            keyboard.D = false;
        }
    });
}

window.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' && !world) {
        console.log('start game by pressing')
        init();
    }
})