import { useTranslation } from 'react-i18next';

const AboutMe = () => {
    const { t } = useTranslation();

    return (
        <>
            <section className="about_me--header site_header container my-5">
                <h2>{t('about_me.title')}</h2>
            </section>
            <section className="container about_me--contact my-5">
                <h3>{t('about_me.contact_info')}</h3>
                <p>Email: <span>lorentsenemilia@gmail.com</span></p>
                <p>Instagram:  <a href='https://www.instagram.com/lorentsen.emilia/' target='_blank'>lorentsen.emilia</a></p>
            </section>
        </>
    )
}

export default AboutMe;