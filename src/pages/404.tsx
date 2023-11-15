import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const NoPage = () => {
    const { t } = useTranslation();

    useEffect(() => {
        document.title = '404';
    }, [])
    return (
        <section className="container noPage">
            <h2>404 {t("404")}</h2>
        </section>
    )
}

export default NoPage;