import { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import canvasState from 'store/canvasState';
import './Canvas.scss';

const WIDTH = 600;
const HEIGHT = 400;

export const Canvas = observer(({ id }) => {
  let boxes = [];
  let image;

  const canvasRef = useRef();
  // const imageRef = useRef();

  let mousedown = false;
  const box = { x1: 0, y1: 0, x2: 0, y2: 0 };

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);

    image = new Image();
    image.src = `/numbers/1906/01/0${id}.jpg`;
    image.onload = () => {
      redraw();
    }

    // canvasRef.current.addEventListener('mousedown', (event) => {
    //   mousedown = true;

    //   box.x1 = event.pageX;
    //   box.y1 = event.pageY;
    // });

    // canvasRef.current.addEventListener('mousemove', (event) => {
    //   if (mousedown) {
    //     box.x2 = event.pageX;
    //     box.y2 = event.pageY;
    //     redraw();
    //   }
    // });

    // canvasRef.current.addEventListener('mouseup', (event) => {
    //   mousedown = false;
    //   boxes.push({ x1: box.x1, y1: box.y1, x2: box.x2, y2: box.y2 });
    //   redraw();
    // });
  }, []);

  const redraw = () => {
    const context = canvasRef.current.getContext('2d');

  //   window.context = context;

  //   context.clearRect(0, 0, WIDTH, HEIGHT);
  //   context.beginPath();
    context.drawImage(image, 0, 0);

  //   if (mousedown) {
  //     drowBox(box);
  //   }

  //   for (let box of boxes) {
  //     drowBox(box);
  //   }
  }

  // const drowBox = (box) => {
  //   const context = canvasRef.current.getContext('2d');

  //   context.beginPath();
  //   context.rect(box.x1, box.y1, box.x2 - box.x1, box.y2 - box.y1);
  //   // context.stroke();
  //   context.globalAlpha = 0.2;
  //   context.fill();
  //   context.globalAlpha = 1;
  // }

  return (
    <div className='Canvas'>
      <canvas width={WIDTH} height={HEIGHT} ref={canvasRef}/>
    </div>
  )
})
