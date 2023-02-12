let canvas = document.getElementById('canvas');
let world;
let keyboard = new Keyboard();
let fullscreen = false;
let gameEnd = false;
let gameStart = false;
let times = [];
let fps;
let fpsRunning = false;
let uiHidden = false;


function init() {
    gameEnd = false;
    gameStart = true;
    document.getElementById('fpsBlock').innerHTML = 'Show fps';
    initLevel();
    addEventListeners();
    world = new World(canvas, keyboard);
    // world.gameStartAudio.volume = 0.05;
    // world.gameStartAudio.play();
    hideOrShowUi();
}


function gameEndScreen() {
    document.getElementById('gameOutro').style.display = 'unset';
    startButton = document.getElementById('startButton');
    startButton.style.display = 'unset';
    document.getElementById('fpsBlock').disabled = false;
    refreshLoop();
    startButton.innerHTML = 'Start again!';
}


function showInfo() {
    const gameInfo = document.getElementById('gameInfo');
    const startButton = document.getElementById('startButton');
    if (gameInfo.style.display === '' || gameInfo.style.display === 'none') {
        showInfoScreen(gameInfo, startButton);
    } else {
        closeInfoScreen(gameInfo, startButton);
    }
}


function pausePlaygame() {
    const gameInfo = document.getElementById('gameInfo');
    if (world.gamePaused || gameInfo.style.display === 'flex') {
        playGame(gameInfo);
    } else if (!world.gamePaused) {
        pauseGame();
    }
}


function fullscreenMode() {
    let element = document.getElementById('gameScreen');
    if (!fullscreen) {
        goFullscreenMode(element);
    } else if (fullscreen) {
        exitFullscreenMode();
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
    window.addEventListener('keydown', (e) => {
        //TODO probaly change to .key or .code since keyCode is deprecated and not supported in few browsers
        listenForKeyDown(e);
    });
    window.addEventListener('keyup', (e) => {
        listenForKeyUp(e);
    });
    addTouchEvents();
    // addClickEvents();
}


window.addEventListener('keydown', (e) => {
    if (e.code == 'Enter' && !world) {
        init();
    }
})


function playGame(gameInfo) {
    world.start();
    gameInfo.style.display = 'none';
    document.getElementById('pausePlayButton').src = 'img/9_intro_outro_screens/pauseButton.png';
}


function pauseGame() {
    document.getElementById('pausePlayButton').src = 'img/9_intro_outro_screens/playButton.png';
    world.pause();
}


function showInfoScreen(gameInfo, startButton) {
    gameInfo.style.display = 'flex';
    if (!gameStart) {
        startButton.style.display = 'none';
    }
    if (world && !gameEnd) {
        world.pause();
        document.getElementById('playPauseAudioButton').style.display = 'none';
        document.getElementById('touchButtonsContainer').style.display = 'none';
        document.getElementById('showHideUiButton').style.display = 'none';
        document.getElementById('pausePlayButton').src = 'img/9_intro_outro_screens/playButton.png';
    }
}


function closeInfoScreen(gameInfo, startButton) {
    gameInfo.style.display = 'none';
    if (!gameStart) {
        startButton.style.display = 'unset';
    }
    if (world && !gameEnd) {
        world.start();
        document.getElementById('playPauseAudioButton').style.display = 'unset';
        document.getElementById('touchButtonsContainer').style.display = 'flex';
        document.getElementById('showHideUiButton').style.display = 'unset';
        document.getElementById('pausePlayButton').src = 'img/9_intro_outro_screens/pauseButton.png';
    }
}


function hideOrShowUi() {
    manageUiTask();
    checkUserResolution();
}


function showHideUiButton() {
    if (!uiHidden) {
        document.getElementById('touchButtonsContainer').style.display = 'none';
        document.getElementById('showHideUiButton').src = 'img/9_intro_outro_screens/hideUI.png';
        uiHidden = true;
    } else if (uiHidden) {
        document.getElementById('touchButtonsContainer').style.display = 'flex';
        document.getElementById('showHideUiButton').src = 'img/9_intro_outro_screens/showUI.png';
        uiHidden = false;
    }
}

function goFullscreenMode(element) {
    document.getElementById('fullscreenButton').src = 'img/9_intro_outro_screens/exitFullscreen.png';
    fullscreen = true;
    enterFullscreen(element);
}


function exitFullscreenMode() {
    document.getElementById('fullscreenButton').src = 'img/9_intro_outro_screens/joinFullscreen.png';
    fullscreen = false;
    exitFullscreen();
}


function refreshLoop() {
    window.requestAnimationFrame(function() {
        if (gameEnd) {
            times = [];
            resetFpsBlock();
            fpsRunning = false;
        } else if (!gameEnd) {
            setFpsBlock();
            calculateFps();
        }
        document.getElementById('fpsBlock').innerHTML = times.length;
    });
}


function calculateFps() {
    fpsRunning = true;
    const now = performance.now();
    while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
    }
    times.push(now);
    fps = times.length;
    refreshLoop();
}


function setFpsBlock() {
    if (!fpsRunning) {
        let container = document.getElementById('fpsBlock');
        container.classList.add('activeFpsBlock');
        container.classList.remove('fpsBlock');
        document.getElementById('fpsBlock').disabled = true;
    }
}


function resetFpsBlock() {
    if (fpsRunning) {
        let container = document.getElementById('fpsBlock');
        container.classList.remove('activeFpsBlock');
        container.classList.add('fpsBlock');
    }
}


function manageUiTask() {
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('gameIntro').style.display = 'none';
    document.getElementById('gameInfo').style.display = 'none';
    document.getElementById('pausePlayButton').style.display = 'unset';
    document.getElementById('fullscreenButton').style.display = 'unset';
    document.getElementById('gameOutro').style.display = 'none';
    document.getElementById('playPauseAudioButton').style.display = 'unset';

}


function checkUserResolution() {
    if (window.innerWidth <= 800) {
        document.getElementById('fullscreenButton').style.display = 'none';
        document.getElementById('touchButtonsContainer').style.display = 'flex';
        document.getElementById('showHideUiButton').style.display = 'unset';
    }
}


function playPauseAudio() {
    buttonsrc = document.getElementById('playPauseAudioButton');
    if (world.gameSoundOn) {
        world.gameSoundOn = false;
        world.gameSoundOff = true;
        buttonsrc.src = 'img/9_intro_outro_screens/volumeOff.png';
    } else {
        world.gameSoundOn = true;
        world.gameSoundOff = false;
        buttonsrc.src = 'img/9_intro_outro_screens/volumeOn.png';
    }
}


function addClickEvents() {
    document.getElementById('arrowLeftButton').addEventListener('mousedown', function() {
        keyboard.LEFT = true;
    });
    document.getElementById('arrowLeftButton').addEventListener('mouseup', function() {
        keyboard.LEFT = false;
    });
    document.getElementById('arrowRightButton').addEventListener('mousedown', function() {
        keyboard.RIGHT = true;
    });
    document.getElementById('arrowRightButton').addEventListener('mouseup', function() {
        keyboard.RIGHT = false;
    });
    document.getElementById('jumpButton').addEventListener('mousedown', function() {
        keyboard.SPACE = true;
    });
    document.getElementById('jumpButton').addEventListener('mouseup', function() {
        keyboard.SPACE = false;
    });
    document.getElementById('throwButton').addEventListener('mousedown', function() {
        keyboard.D = true;
    });
    document.getElementById('throwButton').addEventListener('mouseup', function() {
        keyboard.D = false;
    });

}


function addTouchEvents() {
    document.getElementById('arrowLeftButton').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.LEFT = true;
    });
    document.getElementById('arrowRightButton').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.RIGHT = true;
    });
    document.getElementById('throwButton').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.D = true;
    });
    document.getElementById('jumpButton').addEventListener('touchstart', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.SPACE = true;
    });
    document.getElementById('arrowLeftButton').addEventListener('touchend', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.LEFT = false;
    });
    document.getElementById('arrowRightButton').addEventListener('touchend', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.RIGHT = false;
    });
    document.getElementById('throwButton').addEventListener('touchend', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.D = false;
    });
    document.getElementById('jumpButton').addEventListener('touchend', (e) => {
        if (e.cancelable) {
            e.preventDefault();
        }
        keyboard.SPACE = false;
    });
}


function listenForKeyDown(e) {
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
}


function listenForKeyUp(e) {
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
}