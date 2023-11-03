import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PhotosContainer from './_partials/photo_container';
import { Photos } from './_interfaces';

const HomePage = () => {
  const [photos, setPhotos] = useState<Photos[] | []>([]);

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
