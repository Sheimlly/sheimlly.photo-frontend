import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PhotosContainer from '../_partials/photo_container';
import { Photos, Categories } from './../_interfaces';

const CategoryPhotos = () => {
    const { category_name } = useParams<string>();
    const [photos, setPhotos] = useState<Photos[]>([]);

    useEffect(() => {
        axios
          .get<Categories[]>('/photos/categories/',
            {
                params: {
                    name: category_name
                }
            }
          )
          .then(response => {
            axios
                .get<Photos[]>('/photos/', 
                    {
                        params: {
                            category: response.data[0].id
                        }
                    }
                )
                .then(response => {
                    setPhotos(response.data);
                });
          });
    }, [])

    return (
        <>
            <section className='site_header container my-5'>
                <h2>{category_name}</h2>
            </section>
            <PhotosContainer photos={photos} c_name={false} s_name={false} />
        </>
    )
}

export default CategoryPhotos;