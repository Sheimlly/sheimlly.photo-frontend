import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PhotosContainer from '../_partials/photo_container';
import { Photos, Sessions } from './../_interfaces';

const SessionsPhotos = () => {
    const [photos, setPhotos] = useState<Photos[]>([]);

    useEffect(() => {
        axios
          .get<Sessions[]>('/photos/sessions/')
          .then(response => {
            response.data.map((session) => {
                axios
                    .get('/photos/', 
                        {
                            params: {
                                session: session.id
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
                <h2>Sessions</h2>
            </section>
            <PhotosContainer photos={photos} c_name={false} always_visible_info={true} />
        </>
    )
}

export default SessionsPhotos;