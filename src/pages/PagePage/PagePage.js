import { useParams } from 'react-router-dom';
import { Canvas, Toolbar } from 'components';
import './PagePage.scss';


export const PagePage = () => {
  const { id } = useParams();

  return (
    <section className='PagePage'>
      <Canvas id={id}/>
      <Toolbar/>
    </section>
  );
}
