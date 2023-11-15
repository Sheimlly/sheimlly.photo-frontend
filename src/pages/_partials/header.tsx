import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../fontello/css/fontello.css'
import { useTranslation } from 'react-i18next';

interface PhotoCategories {
    id: number;
    name: string;
    name_pl: string;
}

const Header = () => {
    const { i18n, t } = useTranslation()

    const changeLang = (lang_code: string) => {
        i18n.changeLanguage(lang_code);
    }
    
    return (
        <header className="">
            <div className='title-panel d-flex flex-column flex-md-row justify-content-md-around'>
                <div className='title-panel--socials d-flex align-items-center justify-content-center my-3 my-md-0 order-2 order-md-1'>
                    <a href='https://www.instagram.com/lorentsen.emilia/' target='_blank'><i className="icon-instagram"/></a>
                </div>
                <h1 className='title-panel--title order-1 order-md-2'>
                    Emilia Lorentsen
                </h1>
                <div className='title-panel--languages d-flex align-items-center justify-content-center order-3'>
                    {i18n.language == 'en' ?
                        <p onClick={() => {changeLang('pl')}}>PL</p> : <p onClick={() => {changeLang('en')}}>EN</p>
                    }
                </div>
            </div>
            <div className="navigation-panel">
                <div className="container">
                    <div className="row justify-content-center justify-content-md-between">
                        <p className='col-12 col-lg-3'><a href='/'>{t('header.home')}</a></p>
                        <p className='col-12 col-lg-3'><a href='/categories'>{t('header.categories')}</a></p>
                        <p className='col-12 col-lg-3'><a href='/sessions'>{t('header.sessions')}</a></p>
                        <p className='col-12 col-lg-3'><a href='/about_me'>{t('header.about_me')}</a></p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;