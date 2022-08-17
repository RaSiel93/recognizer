import Tool from './Tool';

export default class Rectangle extends Tool {
  imageSrc = `/numbers/1906/01/01.jpg`;

  image = new Image();

  boxes = [
    { x: 10, y: 10, w: 200, h: 150 },
    { x: 200, y: 100, w: 300, h: 250 },
  ];

  constructor(canvas) {
    super(canvas);
    this.listen();

    this.image.src = this.imageSrc;
    this.image.onload = () => {
      this.redraw();
    }
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;

      this.redraw();
    }
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    // this.saved = this.canvas.toDataURL();
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.boxes.push({ x: this.startX, y: this.startY, w: this.width, h: this.height });
  }

  draw(x, y, w, h) {
    const image = new Image();

    // image.src = this.saved();
    // image.onload = () => {
      // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      // this.ctx.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.globalAlpha = 0.2;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
      this.ctx.stroke();
    // }
  }

  redraw() {
    this.ctx.drawImage(this.image, 0, 0);

    for (let { x, y, w, h } of this.boxes) {
      this.draw(x, y, w, h);
    }

    this.draw(this.startX, this.startY, this.width, this.height);
  }
}
