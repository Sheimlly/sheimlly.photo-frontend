import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PhotosContainer from './_partials/photo_container';
import { Photos } from './_interfaces';

const HomePage = () => {
  const [photos, setPhotos] = useState<Photos[] | []>([]);
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
      .get<Photos[]>('/photos/',
        {
          params: {
            main_page: true,
          }
        }
      )
      .then(response => {
        setPhotos(response.data);
      });
  }, [])

  return (
    <>
        <PhotosContainer photos={photos} />
    </>
  );
}

export default HomePage;
