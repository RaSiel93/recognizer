import { makeAutoObservable } from 'mobx';
import { Rectangle } from 'tools';
import { v4 as uuidv4 } from 'uuid';
import api from 'shared/api';

const HEIGHT = 600;
const WIDTH = 400;

class CanvasState {
	canvas = null;
	boxes = [];
	temporaryBox = null;
	selectedBoxId = null;

	constructor() {
		makeAutoObservable(this);

    api.getBoxes().then((response) => this.setBoxes(response));
	}

	listen() {
		this.canvas.addEventListener('mousemove', this.mouseMoveHandler.bind(this));
		this.canvas.addEventListener('click', this.clickHandler.bind(this));
	}

	mouseMoveHandler(e) {
		const { offsetX, offsetY } = e;

		const hoveredBox = this.findBox(offsetX, offsetY);

		if (hoveredBox) {
			const { x, y, w, h } = hoveredBox;

			document.body.style.cursor = 'pointer';
		} else {
			document.body.style.cursor = 'auto';
		}
	}

	findBox(offsetX, offsetY) {
		return this.boxes.find(({ x, y, w, h }) => {
			return offsetX >= x && offsetX <= (x + w) && offsetY >= y && offsetY <= (y + h)
		})
	}

	clickHandler(e) {
		const { offsetX, offsetY } = e;

		const selectedBox = this.findBox(offsetX, offsetY);

		if (selectedBox) {
			this.setSelectedBoxId(selectedBox.id);
		} else {
			this.setSelectedBoxId(null);
		}
	}

  createBox() {
  	const { x, y, w, h } = this.temporaryBox;

    this.setTemporaryBox(null);
    this.setBoxes([
    	...this.boxes,
    	{
		    id: uuidv4(),
	  		x: (w > 0 ? x : x + w),
	  		y: (h > 0 ? y : y + h),
	  		w: Math.abs(w),
	  		h: Math.abs(h)
    	}
    ]);

  	// api.saveBoxes(this.boxes);
  	// this.download(JSON.stringify(this.boxes), 'test.json', 'application/json');
  }

  setBoxes(boxes) {
  	this.boxes = boxes;
  }

  setTemporaryBox(value) {
  	this.temporaryBox = value;
  }

  setSelectedBoxId(id) {
  	this.selectedBoxId = id;
  }

	setCanvas(canvas) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d');
		this.tool = new Rectangle(canvas, this);
		this.listen();
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
