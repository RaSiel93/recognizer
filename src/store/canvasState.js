import { makeAutoObservable } from 'mobx';
import { Rectangle } from 'tools';

class CanvasState {
	canvas = null;

	constructor() {
		makeAutoObservable(this);
	}

	setCanvas(canvas) {
		this.canvas = canvas;

		this.tool = new Rectangle(canvas);
	}
}

export default new CanvasState;
