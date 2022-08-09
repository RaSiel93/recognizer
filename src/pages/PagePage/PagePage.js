import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './PagePage.scss';

export const PagePage = () => {
  const { id } = useParams();

  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  let width = 0;
  let height = 0;

  let boxes = [];

  const canvasRef = useRef();
  const imageRef = useRef();

  console.log('test')

  let mousedown = false;
  const box = { x1: 0, y1: 0, x2: 0, y2: 0 };

  useEffect(() => {
    const image = imageRef.current;


    image.onload = () => {
      setImageWidth(image.width);
      setImageHeight(image.height);
      width = image.width;
      height = image.height;
    }

    console.log('useEffect', canvasRef.current)

    canvasRef.current.addEventListener('mousedown', (event) => {
      mousedown = true;

      box.x1 = event.pageX;
      box.y1 = event.pageY;
    });

    canvasRef.current.addEventListener('mousemove', (event) => {
      // console.log('mousemove', event);
      // canvasRef.current.getContext('2d').save();
      // canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      if (mousedown) {
        // console.log('mousemove')

        box.x2 = event.pageX;
        box.y2 = event.pageY;
        redraw();
      }
      // canvasRef.current.getContext('2d').fill();
      // canvasRef.current.getContext('2d').restore();
    });

    canvasRef.current.addEventListener('mouseup', (event) => {
      mousedown = false;
      boxes.push({ x1: box.x1, y1: box.y1, x2: box.x2, y2: box.y2 });
      // box.x1 = 0;
      // box.y1 = 0;
      // box.x2 = 0;
      // box.y2 = 0;
      // redraw();
    });


    // canvasRef.current.addEventListener('click', (event) => {
    //   console.log('click', event);
    // });
  }, []);

  const redraw = () => {
    const context = canvasRef.current.getContext('2d');

    window.context = context;

    // console.log('redraw')

    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.drawImage(imageRef.current, 0, 0);

    if (mousedown) {
      drowBox(box);
    }

    for (let box of boxes) {
      console.log('drowBox', box)
      drowBox(box);
    }
  }

  const drowBox = (box) => {
    const context = canvasRef.current.getContext('2d');

    context.beginPath();
    context.rect(box.x1, box.y1, box.x2 - box.x1, box.y2 - box.y1);
    // context.stroke();
    context.globalAlpha = 0.2;
    context.fill();
    context.globalAlpha = 1;
  }

  useEffect(() => {
    // canvasRef.current.getContext('2d').drawImage(imageRef.current, 0, 0);
    redraw();
    // canvasRef.current.getContext('2d').save();
  }, [imageWidth, imageHeight])



  return (
    <section className='PagePage'>
      <canvas width={imageWidth} height={imageHeight} ref={canvasRef}>
        <img src={`/numbers/1906/01/0${id}.jpg`} ref={imageRef} />
      </canvas>
    </section>
  );
}
