//CANVAS
const WIDTH = 10000;
const HEIGHT = 10000;

document.getElementById("map_wrapper").style.width = WIDTH.toString() + "px";
document.getElementById("map_wrapper").style.height = HEIGHT.toString() + "px";

const CANVAS = document.getElementById("game_screen");
const ctx = CANVAS.getContext("2d");

CANVAS.height = HEIGHT;
CANVAS.width = WIDTH;

//FPS COUNTER
var FPS = 120;
var TIME_LAST = Date.now();
var TIME_NOW;
var DELTA_TIME;
var FPS_INTERVAL = 1000 / FPS;

//OBJETOS
var BARCO = new Barco(ctx);

//FUNCTIONS
function run_engine() {
    requestAnimationFrame(run_engine);

    TIME_NOW = Date.now();
    DELTA_TIME = TIME_NOW - TIME_LAST;

    loop_principal();

    if (DELTA_TIME > FPS_INTERVAL) {
        TIME_LAST = TIME_NOW - (DELTA_TIME % FPS_INTERVAL);

        render_objects();
    }
}

function render_objects() {
    // CENARIO
    ctx.fillStyle = "white";
    ctx.clearRect(0, 0, WIDTH, HEIGHT);


    //OBJETOS
    BARCO.draw(ctx);
}

var YY = 0;
var XX = 0;

function loop_principal() {

    BARCO.input(-YY, XX);
    YY = 0;
    XX = 0;

    BARCO.update();


}

document.addEventListener('keydown', function (event) {
    if (event.key == "w") {
        YY = 0.1
    }

    else if (event.key == "s") {
        YY = -0.1
    }

    else if (event.key == "a") {
        XX = 0.1;
    }

    else if (event.key == "d") {
        XX = -0.1;
    }
});

//START

run_engine();

