import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PhotosContainer from '../_partials/photo_container';
import { Photos, Sessions } from './../_interfaces';
import { useTranslation } from 'react-i18next';

const SessionsPhotos = () => {
    const [photos, setPhotos] = useState<Photos[]>([]);

    const { t } = useTranslation()
    const { i18n } = useTranslation();


    useEffect(() => {
        axios
          .get<Sessions[]>('/photos/sessions/')
          .then(response => {
            response.data.map((session) => {
                axios
                    .get<Photos[]>('/photos/', 
                        {
                            params: {
                                session: session.id
                            }
                        }
                    )
                    .then((response) => {
                        if(response.data.length !== 0) setPhotos(prevPhotos => [...prevPhotos, response.data[0]]);
                    })
            })
        });

        if (i18n.language == 'pl') {
            document.title = 'Sesje';
        } else {
            document.title = 'Sessions';
        }
      }, [])
    
    return (
        <>
            <section className='site_header container my-5'>
                <h2>{t('sessions')}</h2>
            </section>
            <PhotosContainer photos={photos} c_name={false} always_visible_info={true} />
        </>
    )
}

export default SessionsPhotos;