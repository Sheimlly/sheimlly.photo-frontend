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

    const [categories, setCategories] = useState<PhotoCategories[] | []>([]);

    useEffect(() => {
        axios
            .get<PhotoCategories[]>('/photos/categories/', {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                setCategories(response.data);
            });
    }, []);
    
    return (
        <header className="">
            <div className='title-panel d-flex justify-content-around'>
                <div className='title-panel--socials d-flex align-items-center'>
                    <a href='https://www.instagram.com/lorentsen.emilia/' target='_blank'><i className="icon-instagram"/></a>
                </div>
                <h1 className='title-panel--title'>
                    Emilia Lorentsen
                </h1>
                <div className='title-panel--languages d-flex align-items-center'>
                    {i18n.language == 'en' ?
                        <p onClick={() => {changeLang('pl')}}>PL</p> : <p onClick={() => {changeLang('en')}}>EN</p>
                    }
                </div>
            </div>
            <div className="navigation-panel">
                <div className="container">
                    <div className="row justify-content-between">
                        <p className="col-3"><a href='/'>{t('header.home')}</a></p>
                        <ul className="col-3">
                            <p>{t('header.categories.name')}</p>
                            <li>
                                <ul><a href='/categories'>{t('header.categories.all')}</a></ul>
                                {categories.map((category) => {
                                    return <ul key={category.id}><a href={`/categories/${category.name}`}>{i18n.language == 'en' ? category.name : category.name_pl}</a></ul>
                                })}
                            </li>
                        </ul>
                        <p className="col-3"><a href='/sessions'>{t('header.sessions')}</a></p>
                        <p className="col-3"><a href='/about_me'>{t('header.about_me')}</a></p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;