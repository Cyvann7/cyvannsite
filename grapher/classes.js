class Node {
    constructor(x, y, value, neighbours) {
        this.x = x;
        this.y = y;
        this.value = value;
        this.color = foregroundColor;
        this.neighbours = neighbours;
    }


    draw() {
        ctx.fillStyle = this.color;
        ctx.strokeStyle = outlineColor;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 30, 0, pi2, false);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ed4ef2';

        ctx.font = "40px Consolas";

        ctx.fillText(this.value, this.x - (15 * this.value.length), this.y + 15);
    }
}

class Edge {
    constructor(from, to, weight) {
        this.from = from;
        this.to = to;
        this.weight = weight;
        this.two_way = false;
    }

    draw() {

        var grad = ctx.createLinearGradient(this.from.x, this.from.y, this.to.x, this.to.y);
        if (this.two_way == false) {
            grad.addColorStop(0, "#e0e0e0");
            grad.addColorStop(0.65, "#e0e0e0");
            grad.addColorStop(0.66, "#ed4ef2");
        } else {
            grad.addColorStop(0.34, "#ed4ef2");
            grad.addColorStop(0.35, "#e0e0e0");
            grad.addColorStop(0.65, "#e0e0e0");
            grad.addColorStop(0.66, "#ed4ef2");
        }
        ctx.strokeStyle = grad;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(this.from.x, this.from.y);
        ctx.lineTo(this.to.x, this.to.y);

        ctx.stroke();

        ctx.fillStyle = '#ed4ef2';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.font = '40px Recursive, sans-serif';
        ctx.fillText(this.weight, (this.from.x + this.to.x) / 2 - 14, (this.from.y + this.to.y) / 2 + 14);
        ctx.strokeText(this.weight, (this.from.x + this.to.x) / 2 - 14, (this.from.y + this.to.y) / 2 + 14);
    }
}