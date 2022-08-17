import Tool from './Tool';

export default class Rectangle extends Tool {
  constructor(canvas, state) {
    super(canvas);
    this.state = state;
    this.listen();
  }

  listen() {
    this.canvas.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
    this.canvas.addEventListener('mousedown', this.mouseDownHandler.bind(this));
    this.canvas.addEventListener('mouseup', this.mouseUpHandler.bind(this));
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.state.setTemporaryBox({
        x: this.state.temporaryBox.x,
        y: this.state.temporaryBox.y,
        w: e.pageX - e.target.offsetLeft - this.state.temporaryBox.x,
        h: e.pageY - e.target.offsetTop - this.state.temporaryBox.y
      });
    }
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.state.setTemporaryBox({
      x: e.pageX - e.target.offsetLeft,
      y: e.pageY - e.target.offsetTop
    });
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    this.state.createBox();
  }
}
