class Barco {
    constructor(CANVAS) {
        this.ctx = CANVAS;

        this.longitude = LONGITUDE;
        this.latitude = LATITUDE;

        this.velocity = [0, 0];
        this.acceleration = [0, 0];

        this.force = 0;
        this.teta = 0;

        this.width = 20;
        this.height = 40;

        this.size = 70; //m

        this.zoom = 10000;
        document.getElementById("map_wrapper").style.transform = "scale(" + this.zoom.toString() + ")";
    }

    draw() {
        ctx.fillStyle = "black";
        ctx.fillRect((WIDTH / 2) - (this.width / 2), (HEIGHT / 2) - (this.height / 2), this.width, this.height);

        ctx.fillStyle = "red";
        ctx.fillRect((WIDTH / 2) - 1, (HEIGHT / 2) - 1, 2, -80);

        // Start a new Path
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.moveTo(WIDTH / 2, HEIGHT / 2);
        ctx.lineTo((WIDTH / 2) - (60 * Math.sin(-this.teta)), (HEIGHT / 2) - (60 * Math.cos(this.teta)));

        // Draw the Path
        ctx.stroke();
    }

    update() {
        this.acceleration[1] += this.force * Math.sin(this.teta) * 0.5;
        this.acceleration[0] += -this.force * Math.cos(this.teta);

        //Position update
        this.velocity[0] += this.acceleration[0];
        this.velocity[1] += this.acceleration[1];

        let maxVelocity = 1;
        for (let i = 0; i < 2; i++) {
            if (Math.abs(this.velocity[i]) > maxVelocity) {
                if (this.velocity[i] > 0)
                    this.velocity[i] = maxVelocity;
                else
                    this.velocity[i] = -maxVelocity;
            }
        }

        // if (Math.abs(this.teta) > 2 * Math.PI)
        // this.teta = 0;

        this.longitude += this.velocity[0];
        this.latitude += this.velocity[1];

        //limitadores
        let maxL = 179;
        if (this.longitude > maxL) {
            this.longitude = -maxL;
        }

        if (this.longitude < -maxL) {
            this.longitude = maxL;

        }

        if (this.latitude > maxL / 2 - 2) {
            this.latitude = -maxL / 2 + 2;

        }

        if (this.latitude < -maxL / 2) {
            this.latitude = maxL / 2 - 2;
        }

        this.acceleration[0] = 0;
        this.acceleration[1] = 0;
        this.force = 0;

        this.velocity[0] *= 0.9;
        this.velocity[1] *= 0.9;

        //att mapa
        console.log(this.longitude, this.latitude);
        mover_para_coordenadas(this.longitude, this.latitude);
        rotacionar(this.teta * 180 / Math.PI);
    }

    input(f, t) {
        this.force += 10 * f / this.zoom;
        this.teta += t;
    }
}