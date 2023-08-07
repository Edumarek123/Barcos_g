class Barco {
    constructor(CANVAS) {
        this.ctx = CANVAS;

        this.longitude = 0;
        this.latitude = 0;

        this.velocity = [0, 0];

        this.force = 0;
        this.teta = 0;

        this.width = 20;
        this.height = 40;

        this.size = 70;
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
        //Position update
        // this.velocity[0] += this.force * Math.cos(this.teta);
        // this.velocity[1] += this.force * Math.sin(this.teta);

        this.latitude += this.force * Math.cos(this.teta);
        this.longitude += this.force * Math.sin(this.teta);


        if (Math.abs(this.teta) > 2 * Math.PI)
            this.teta = 0;


        // this.latitude += this.velocity[0];
        // this.longitude += this.velocity[1];

        //limitadores
        let maxL = 170;
        if (this.longitude > maxL) {
            this.longitude = -maxL;
        }

        if (this.longitude < -maxL) {
            this.longitude = maxL;

        }

        if (this.latitude > maxL) {
            this.latitude = -maxL;

        }

        if (this.latitude < -maxL) {
            this.latitude = maxL;
        }

        //att mapa
        mover_para_coordenadas(this.longitude, this.latitude);
        rotacionar(this.teta * 180 / Math.PI);
    }

    input(f, t) {
        this.force += f;
        this.teta += t / 4;
    }
}