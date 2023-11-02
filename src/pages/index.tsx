import { useState, useEffect, useRef, useLayoutEffect, createRef } from 'react';
import axios from 'axios';

interface MainPagePhotos {
  id: number;
  name: string;
  session_name?: string;
  session_name_pl?: string;
  image: string;
  category_name: string;
  category_name_pl: string;
  category: number;
  date_created: string;
  date_uploaded: string;
  main_page: string;
}

function HomePage() {
  const [photos, setPhotos] = useState<MainPagePhotos[] | []>([]);
  const div_ref = useRef<HTMLElement>(null);
  const [imageWidth, setImageWidth] = useState<number>(0);

  const setRefElement = (el: HTMLElement) => {
    if (!el) return;
    div_ref.current = el;
    setImageWidth(div_ref.current.offsetWidth);
  };

  window.addEventListener('resize', () => {
    if (div_ref.current) {
      setImageWidth(div_ref.current.offsetWidth)
    }
  })

  useEffect(() => {
    axios
      .get<MainPagePhotos[]>('/photos/photos/?main_page=True')
      .then(response => {
        setPhotos(response.data);
      });
  }, [])

  return (
    <>
        <section className='container main_page--photos my-3'>
            <div className='row main_page--photos__container'>
              {photos.map((photo, index) => {
                return (
                  <div ref={ref => { index === photos.length - 1 && setRefElement(ref)  }} key={index} style={{'height':imageWidth}} className='col-4 d-flex justify-content-center align-items-center main_page--photos__container--photo'>
                    <img src={photo.image} alt={photo.name} />
                  </div>
                );
              })}
            </div>
        </section>
    </>
  );
}

export default HomePage;
