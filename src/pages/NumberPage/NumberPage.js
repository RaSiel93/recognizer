import { Link } from 'react-router-dom';

import './NumberPage.scss';

export const NumberPage = () => {
  const pages = [
    'numbers/1906/01/01.jpg',
    'numbers/1906/01/02.jpg',
    'numbers/1906/01/03.jpg',
    'numbers/1906/01/04.jpg',
    'numbers/1906/01/05.jpg',
    'numbers/1906/01/06.jpg',
    'numbers/1906/01/07.jpg',
    'numbers/1906/01/08.jpg',
  ];

  return (
    <section className='NumberPage'>
      <div className='NumberPage-Pages'>
        {
          pages.map((src, index) => {
            return <Link key={index} to={`pages/${index + 1}`}>
              <div className='NumberPage-Page'>
                <img src={src} />
              </div>
            </Link>
          })
        }
      </div>
    </section>
  );
}
