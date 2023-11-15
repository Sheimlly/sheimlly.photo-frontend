import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PhotosContainer from '../_partials/photo_container';
import { Photos, Categories } from './../_interfaces';
import { useTranslation } from 'react-i18next';

const CategoriesPhotos = () => {
    const [photos, setPhotos] = useState<Photos[]>([]);

    const { t } = useTranslation()

    useEffect(() => {
        axios
          .get<Categories[]>('/photos/categories/')
          .then(response => {
            response.data.map((category) => {
                axios
                    .get('/photos/', 
                        {
                            params: {
                                category: category.id
                            }
                        }
                    )
                    .then((response) => {
                        if(response.data.length !== 0) setPhotos(prevPhotos => [...prevPhotos, response.data[0]]);
                    })
            })
          });

          document.title = 'Categories';
      }, [])
    
    return (
        <>
            <section className='site_header container my-5'>
                <h2>{t('categories')}</h2>
            </section>
            <PhotosContainer photos={photos} s_name={false} always_visible_info={true} date={false} />
        </>
    )
}

export default CategoriesPhotos;