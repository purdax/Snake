let rows = 20;
let colums = 20;
let table;
let draw;

//snake coordinates
let snakeX = 20 * 5; // 100
let snakeY = 20 * 5; // 100
let speedX = 0;
let speedY = 0;
let snakeSize = [];

//apple coordinates
let appleX;
let appleY;

let gameOver = false;

window.onload = function () {
    table = document.getElementById("table");
    table.height = rows * 25; // 500
    table.width = colums * 25; // 500
    draw = table.getContext("2d");
    randomiseFood(); 
    document.addEventListener("keyup", changeDirection);
    setInterval(game, 1000/10);
}

function game() {
    if (gameOver == true) {
        restartGame();
        return;
    }
    draw.fillStyle ="black";
    draw.fillRect(30, 30, table.width, table.height);

    draw.fillStyle="red";
    draw.fillRect(appleX, appleY, 15, 15);

    if (snakeX == appleX && snakeY == appleY) {
        snakeSize.push([appleX, appleY]);
        randomiseFood();
    }

    for (let i = snakeSize.length - 1; i > 0; --i) {
        snakeSize[i] = snakeSize[i - 1];
    }

    if (snakeSize.length) {
        snakeSize[0] = [snakeX, snakeY];
    }

    draw.fillStyle="green";
    snakeX += speedX * 25;
    snakeY += speedY * 25;
    draw.fillRect(snakeX, snakeY, 25, 25);
    
    for(let i = 0; i < snakeSize.length; ++i) {
        draw.fillRect(snakeSize[i][0], snakeSize[i][1], 25, 25);
    }

    if (snakeX <= 0 || snakeX > colums * 25 - 1|| snakeY <= 0 || snakeY > rows * 25 - 1) {
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeSize.length; ++i) {
        if (snakeX == snakeSize[i][0] && snakeY == snakeSize[i][1]) {
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDirection(move) {
    if (move.code == "ArrowUp" && speedY != 1) {
        speedX = 0;
        speedY = -1;
    } else if (move.code == "ArrowDown" && speedY != -1) {
        speedX = 0;
        speedY = 1;
    } else if (move.code == "ArrowLeft" && speedX != 1) {
        speedX = -1;
        speedY = 0; 
    } else if (move.code == "ArrowRight" && speedX != -1) {
        speedX = 1;
        speedY = 0;
    }

}

function randomiseFood() {
    appleX = Math.floor(Math.random() * colums) * 25;
    appleY = Math.floor(Math.random() * rows) * 25;
    if (appleX == 0) {
        appleX += 25;
    }
    if (appleY == 0) {
        appleY += 25;
    }
}

function restartGame() {
    let restart = document.getElementById('restart');
    restart.innerHTML = '<button type="button" onClick="history.go(0);" class="btn btn-primary"><img src="https://img.icons8.com/ios-filled/50/null/restart--v1.png"/></button>';
}