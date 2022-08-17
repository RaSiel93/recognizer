import { makeAutoObservable } from 'mobx';
import { Rectangle } from 'tools';
import api from 'shared/api';

// import { BoxStore } from 'store/BoxStore';

const HEIGHT = 600;
const WIDTH = 400;

// const boxStore = new BoxStore();

class CanvasState {
	canvas = null;
	boxes = [];
	temporaryBox = null;

	constructor() {
		makeAutoObservable(this);

    api.getBoxes().then((response) => this.setBoxes(response));
	}

  // redraw() {
  //   const { height, width } = this.image;
  //   const widthPosition = HEIGHT / height * width;
  //   // (WIDTH - widthPosition) / 2

  //   this.ctx.drawImage(this.image, 0, 0, widthPosition, HEIGHT);

  //   for (let { x, y, w, h } of this.boxes) {
  //     this.rectangleDraw(x, y, w, h);
  //   }
  // }

  createBox() {
  	const { x, y, w, h } = this.temporaryBox;

    this.setTemporaryBox(null);
  	this.boxes.push({ x, y, w, h });

  	// api.saveBoxes(this.boxes);
  	this.download(JSON.stringify(this.boxes), 'test.json', 'application/json');
  }

  setBoxes(boxes) {
  	this.boxes = boxes;
  }

  setTemporaryBox(value) {
  	this.temporaryBox = value;
  }

	setCanvas(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.tool = new Rectangle(canvas, this, this.createBox.bind(this));
	}

  download = (content, fileName, contentType) => {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
}

export default new CanvasState;
