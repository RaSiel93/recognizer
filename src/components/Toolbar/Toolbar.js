import { observer } from 'mobx-react-lite';
import './Toolbar.scss';

import canvasState from 'store/canvasState';

export const Toolbar = observer(() => {
  const { boxes, selectedBoxId } = canvasState;

  console.log('Toolbar boxes', boxes.length)

  const removeBox = () => {
    console.log('selectedBoxId', boxes)

    canvasState.setBoxes([
      ...boxes.filter(({ id }) => id != selectedBoxId)
    ]);
  }

  const saveBoxes = () => {
    download(JSON.stringify(boxes), 'test.json', 'application/json');
  }

  const download = (content, fileName, contentType) => {
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  return <div className='Toolbar'>
    <a onClick={removeBox}>Выдаліць</a>
    <a onClick={saveBoxes}>Захаваць</a>
  </div>
})
