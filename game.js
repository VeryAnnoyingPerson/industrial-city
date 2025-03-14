let tileset = new Image();
tileset.src = "https://raw.githubusercontent.com/VeryAnnoyingPerson/industrial-city/main/tile_0001.png"; // Update with actual path

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let offsetX = 0, offsetY = 0;
let startX, startY;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function startGame() {
    document.getElementById("menu").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";

    resizeCanvas(); 

    tileset.onload = function() {
        gameLoop();
    };

    tileset.onerror = function() {
        alert("Error: Failed to load the tileset image.");
    };
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    requestAnimationFrame(gameLoop);
}

function drawMap() {
    for (let x = 0; x < canvas.width; x += 32) {
        for (let y = 0; y < canvas.height; y += 32) {
            ctx.drawImage(tileset, 0, 0, 32, 32, x + offsetX, y + offsetY, 32, 32);
        }
    }
}

canvas.addEventListener("touchstart", (e) => {
    let touch = e.touches[0];
    startX = touch.clientX;
    startY = touch.clientY;
});

canvas.addEventListener("touchmove", (e) => {
    let touch = e.touches[0];
    offsetX += touch.clientX - startX;
    offsetY += touch.clientY - startY;
    startX = touch.clientX;
    startY = touch.clientY;
});

window.addEventListener("resize", resizeCanvas);

function openSettings() {
    alert("Opening settings...");
}

function showCredits() {
    alert("Game by [Your Name]");
}

window.onload = function() {
    if (!canvas.getContext) {
        alert("Error: Canvas is not supported in this browser.");
    }
};
