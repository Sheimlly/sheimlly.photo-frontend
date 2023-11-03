import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PhotosContainer from '../_partials/photo_container';
import { Photos, Categories } from './../_interfaces';

const CategoriesPhotos = () => {
    const [photos, setPhotos] = useState<Photos[]>([]);

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
                        setPhotos(prevPhotos => [...prevPhotos, response.data[0]]);
                    })
            })
          });
      }, [])
    
    return (
        <>
            <section className='site_header container my-5'>
                <h2>Categories</h2>
            </section>
            <PhotosContainer photos={photos} s_name={false} always_visible_info={true} date={false} />
        </>
    )
}

export default CategoriesPhotos;