import { useState, useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import canvasState from 'store/canvasState';
import './Canvas.scss';

const WIDTH = 400;
const HEIGHT = 600;

export const Canvas = observer(({ id }) => {
  const canvasRef = useRef();
  const imageSrc = `/numbers/1913/13/01.webp`;

  const [image, setImage] = useState(new Image());
  const [imageLoaded, setImageLoaded] = useState(false);

  const { boxes, temporaryBox, selectedBoxId } = canvasState;
  console.log('Canvas boxes', boxes.length)

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);

    image.src = imageSrc;
    image.onload = () => setImageLoaded(true);

    canvasRef.current.addEventListener('dragover', handleDrag)
    canvasRef.current.addEventListener('drop', handleDrop)
  }, []);

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    var reader = new FileReader();
      reader.onloadend = function(e) {
      var result = JSON.parse(this.result);
      canvasState.setBoxes(result);
    };
    reader.readAsText(file);
  }

  useEffect(() => {
    if (imageLoaded) {
      redraw();
    }
  }, [imageLoaded, boxes, temporaryBox, selectedBoxId]);


  const redraw = () => {
    drawImage();

    for (let { id, x, y, w, h } of boxes) {
      const color = id === selectedBoxId ? '#FFBF00' : '#000000';

      drawRectangle(x, y, w, h, color);
    }

    if (temporaryBox) {
      const { x, y, w, h } = temporaryBox;

      drawRectangle(x, y, w, h, '#0000FF');
    }
  }

  const drawImage = () => {
    const context = canvasRef.current.getContext('2d');
    const { height, width } = image;
    const widthPosition = HEIGHT / height * width;

    context.drawImage(image, 0, 0, widthPosition, HEIGHT);
  }

  const drawRectangle = (x, y, w, h, color = '#000') => {
    const context = canvasRef.current.getContext('2d');

    // console.log('color', color, x, y, w, h)

    context.beginPath();
    context.fillStyle = color;
    context.rect(x, y, w, h);
    context.globalAlpha = 0.2;
    context.fill();
    context.globalAlpha = 1;
    context.stroke();
  }

  return (
    <div className='Canvas'>
      <canvas width={WIDTH} height={HEIGHT} ref={canvasRef}/>
    </div>
  )
})
