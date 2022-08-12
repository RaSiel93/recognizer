import { makeAutoObservable } from 'mobx';

class CanvasState {
	canvas = null;

	constructor() {
		makeAutoObservable(this);
	}

	setCanvas(canvas) {
		this.canvas = canvas;
		console.log('test')
	}
}

export default new CanvasState;