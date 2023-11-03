import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PhotosContainer from '../_partials/photo_container';
import { Photos, Sessions } from './../_interfaces';
import { useParams } from 'react-router';

const SessionPhotos = () => {
    const { id } = useParams();
    const [photos, setPhotos] = useState<Photos[]>([]);
    const [session, setSession] = useState<Sessions>();

    useEffect(() => {
        axios
          .get<Photos[]>('/photos/',
            {
                params: {
                    session: id
                }
            }
          )
          .then(response => {
            setPhotos(response.data);
          })

          axios
            .get<Sessions[]>('/photos/sessions/',
                {
                    params: {
                        id: id
                    }
                }
            )
            .then(response => {
                setSession(response.data[0]);
            })


      }, [])
    
    return (
        <>
            <section className='site_header container my-5'>
                <h2>{session?.name} {session?.date_taken}</h2>
            </section>
            <PhotosContainer photos={photos} s_name={false} c_name={false} />
        </>
    )
}

export default SessionPhotos;