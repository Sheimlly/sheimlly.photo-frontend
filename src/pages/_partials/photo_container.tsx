import React, { useState, useRef, useEffect } from 'react';
import { Photos } from '../_interfaces'
import { useTranslation } from 'react-i18next';

interface PhotosListProps {
    photos: Photos[];
    c_name: boolean;
    s_name: boolean;
    date: boolean;
    always_visible_info: boolean;
}

const PhotosContainer = ( { photos, c_name, s_name, always_visible_info, date } : PhotosListProps) => {
    const div_ref = useRef<HTMLDivElement | null>(null);
    const [imageWidth, setImageWidth] = useState<number>(0);

    const render_info = c_name || s_name;

    const { i18n } = useTranslation();
    
    const setRefElement = (el: HTMLDivElement) => {
        if (!el) return;
        div_ref.current = el;
        setImageWidth(el.offsetWidth);
    };

    window.addEventListener('resize', () => {
        if (div_ref.current) {
            setImageWidth(div_ref.current.offsetWidth)
        }
    })

    return (
        <section className='container photos mt-5 mb-3 my-lg-5'>
            <div className='row photos__container'>
                {photos.map((photo, index) => {
                return (
                    <div ref={ref => { ref && index === photos.length - 1 && setRefElement(ref) }} key={index} style={{'height':imageWidth}} className='col-12 col-md-6 mb-4 mb-lg-0 col-md-6 col-lg-4 d-flex justify-content-center align-items-center photos__container--photo'>
                        <img className={render_info ? 'photo_with_info' : ''} style={always_visible_info ? {'opacity':'0.5'} : {}} src={photo.image} alt={photo.name} />
                        { render_info &&
                            <div className={'photos__container--photo-info'} style={always_visible_info ? {'display':'flex', 'height':imageWidth, 'width':imageWidth} : {'height':imageWidth, 'width':imageWidth}}>
                                { c_name &&
                                    <p><a href={`/categories/${photo.category_name}`}>{i18n.language == 'en' ? photo.category_name : photo.category_name_pl}</a></p>
                                }
                                { s_name &&
                                    <p><a href={`/sessions/${photo.session}`}>{i18n.language == 'en' ? photo.session_name : photo.session_name_pl}</a></p>
                                }
                                { date &&
                                    <p>{photo.date_created}</p>
                                }
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
    date: true,
}

export default PhotosContainer