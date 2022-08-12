import { useParams } from 'react-router-dom';
import { Canvas } from 'components';
import './PagePage.scss';


export const PagePage = () => {
  const { id } = useParams();

  return (
    <section className='PagePage'>
      <Canvas id={id}/>
    </section>
  );
}
