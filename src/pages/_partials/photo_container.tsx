import React, { useState, useRef } from 'react';
import { Photos } from '../_interfaces'

interface PhotosListProps {
    photos: Photos[];
    c_name: boolean;
    s_name: boolean;
    date: string;
    always_visible_info: boolean;
}

const PhotosContainer = ( { photos, c_name, s_name, always_visible_info, date } : PhotosListProps) => {
    const div_ref = useRef<HTMLElement>(null);
    const [imageWidth, setImageWidth] = useState<number>(0);

    const render_info = c_name || s_name;
    const visibility = always_visible_info ? 'flex' : 'none';
    const img_opacity = always_visible_info ? '0.5' : '1';
    
    const setRefElement = (el: HTMLElement) => {
        if (!el) return;
        div_ref.current = el;
        setImageWidth(div_ref.current.offsetWidth);
    };

    window.addEventListener('resize', () => {
        if (div_ref.current) {
            setImageWidth(div_ref.current.offsetWidth)
        }
    })

    return (
        <section className='container photos my-3'>
            <div className='row photos__container'>
                {photos.map((photo, index) => {
                return (
                    <div ref={ref => { index === photos.length - 1 && setRefElement(ref)  }} key={index} style={{'height':imageWidth}} className='col-4 d-flex justify-content-center align-items-center photos__container--photo'>
                        <img className={render_info ? 'photo_with_info' : ''} style={{'opacity':img_opacity}} src={photo.image} alt={photo.name} />
                        { render_info &&
                            <div className={'photos__container--photo-info'} style={{'height':imageWidth, 'width':imageWidth, 'display':visibility}}>
                                { c_name &&
                                    <p><a href={`/categories/${photo.category_name}`}>{photo.category_name}</a></p>
                                }
                                { s_name &&
                                    <p>{photo.session_name}</p>
                                }
                                <p>{date}</p>
                            </div>
                        }
                    </div>
                );
                })}
            </div>
        </section>
    )
}

PhotosContainer.defaultProps = {
    c_name: true,
    s_name: true,
    always_visible_info: false,
    date: '',
}

export default PhotosContainer