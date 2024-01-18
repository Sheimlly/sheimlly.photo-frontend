import { useRef, useState, useEffect } from 'react';
import '../../../fontello/css/fontello.css'
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { i18n, t } = useTranslation()

    const changeLang = (lang_code: string) => {
        i18n.changeLanguage(lang_code);
    }

    const navigation = useRef<HTMLDivElement>(null);
    const header = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(window.scrollY)


    const showNavigation = () => {
        if (navigation.current) {navigation.current.style.display = 'block';}
    }

    const hideNavigation = () => {
        if (navigation.current) {navigation.current.style.display = 'none';}
    }

    useEffect(()=> {
        const handleScroll = () => {
            let moving = window.scrollY;

            if(position < moving) {
                if (header.current && header.current.style.top == '0px') {header.current.style.top = '-75px';}
            }
            else {
                if (header.current && header.current.style.top == '-75px') {header.current.style.top = '0px';}
            }
            
            setPosition(moving);
        };
        window.addEventListener("scroll", handleScroll);
        return(() => {
           window.removeEventListener("scroll", handleScroll);
        })
    })
    
    return (
        <header>
            <div id='header__more-container' ref={header} style={{top: '0'}} className='header__more-container'>
                <h1 className='header__more-container--title'>Emilia Lorentsen</h1>
                <svg onClick={showNavigation} className='header__more-container--button' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#FFFFFF" d="M512 443.733333a68.266667 68.266667 0 1 1-0.034133 136.567467A68.266667 68.266667 0 0 1 512 443.733333z m0-238.933333a68.266667 68.266667 0 1 1-0.034133 136.567467A68.266667 68.266667 0 0 1 512 204.8z m0 477.866667a68.266667 68.266667 0 1 1-0.034133 136.567466A68.266667 68.266667 0 0 1 512 682.666667z"  />
                </svg>
            </div>

            {/* <h1 className='title-panel--title order-1 order-md-2'>Emilia Lorentsen</h1> */}

            <div id='header__container' ref={navigation} className='header__container'>
                <svg onClick={hideNavigation} className='header__container--button d-md-none' version="1.1" viewBox="0 0 512 512" width="512px">
                    <path fill="#FFFFFF" d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z"/>
                </svg>
                <div className='title-panel d-flex flex-column flex-md-row justify-content-md-around'>
                    <div className='title-panel__socials-container d-flex align-items-center justify-content-center my-3 my-md-0 order-2 order-md-1'>
                        <a className='title-panel__socials-container--social' href='https://www.instagram.com/lorentsen.emilia/' target='_blank'><i className="icon-instagram title-panel__socials-container--icon"/></a>
                    </div>
                    <h1 className='title-panel--title order-1 order-md-2'>Emilia Lorentsen</h1>
                    <div className='title-panel__languages-container d-flex align-items-center justify-content-center order-3'>
                        {i18n.language == 'en' ?
                            <p className='title-panel__languages-container--language' onClick={() => {changeLang('pl')}}>PL</p> : <p className='title-panel__languages-container--language' onClick={() => {changeLang('en')}}>EN</p>
                        }
                    </div>
                </div>
                <div className="navigation-panel">
                    <div className="navigation-panel__container container">
                        <a className="navigation-panel__container--item" href='/'>{t('header.home')}</a>
                        <a className="navigation-panel__container--item" href='/categories'>{t('header.categories')}</a>
                        <a className="navigation-panel__container--item" href='/sessions'>{t('header.sessions')}</a>
                        <a className="navigation-panel__container--item" href='/about_me'>{t('header.about_me')}</a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;