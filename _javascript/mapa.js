var LONGITUDE = 0;
var LATITUDE = 0;

function atualiza_coordenadas() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(comuta_coordenadas, null, { enableHighAccuracy: true, timeout: 1000 });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
    return true;
}

function comuta_coordenadas(coordenadas) {
    LONGITUDE = coordenadas.coords.longitude;
    LATITUDE = coordenadas.coords.latitude;

    coordenadas_to_pixels(LONGITUDE, LATITUDE);
}

function coordenadas_to_pixels(longitude, latitude) {
    let mWidth = document.getElementById("world_map").offsetWidth;
    let mHeight = document.getElementById("world_map").offsetHeight;

    let x = (longitude + 180) * (mWidth / 360);
    let y = (mHeight / 2) - (Math.log(Math.tan((Math.PI / 4) + ((latitude * Math.PI / 180) / 2))) / (2 * Math.PI));

    document.getElementById("ponto").style.left = (x - 1.5).toString() + "px";
    document.getElementById("ponto").style.top = (y - 1.5).toString() + "px";

    return { x, y };
}

function mover_para_coordenadas(longitude, latitude) {
    let c = coordenadas_to_pixels(longitude, latitude);

    document.getElementById("world_map").style.objectPosition = (c.x - 500).toString() + "px " + (c.y - 500).toString() + "px";
}

function rotacionar(teta) {
    document.getElementById("world_map").style.transform = "rotate(" + teta.toString() + "deg)";
}

atualiza_coordenadas();