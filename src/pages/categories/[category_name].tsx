import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PhotosContainer from '../_partials/photo_container';
import { Photos, Categories } from './../_interfaces';
import { useTranslation } from 'react-i18next';

const CategoryPhotos = () => {
    const { category_name } = useParams<string>();
    const [category, setCategory] = useState<Categories>();
    const [photos, setPhotos] = useState<Photos[]>([]);

    const { i18n } = useTranslation()

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
            document.title = `${response.data[0]?.name}`;
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
                <h2>{i18n.language == 'en' ? category?.name : category?.name_pl}</h2>
            </section>
            <PhotosContainer photos={photos} c_name={false} s_name={false} />
        </>
    )
}

export default CategoryPhotos;