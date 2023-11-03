import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PhotosContainer from '../_partials/photo_container';
import { Photos, Categories } from './../_interfaces';

const CategoryPhotos = () => {
    const { category_name } = useParams<string>();
    console.log(category_name);

    const [category, setCategory] = useState<Categories>();
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
            setCategory(response.data[0]);
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
            <PhotosContainer photos={photos} c_name={false} s_name={false} />
        </>
    )
}

export default CategoryPhotos;