import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
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
            <PhotosContainer photos={photos} s_name={false} always_visible_info={true} />
        </>
    )
}

export default CategoriesPhotos;