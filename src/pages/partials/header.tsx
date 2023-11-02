import { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../fontello/css/fontello.css'

interface PhotoCategories {
    id: number;
    name: string;
    name_pl: string;
}

const Header = () => {
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
            <h1>
                Emilia Lorentsen Fotografia
                <a href='https://www.instagram.com/lorentsen.emilia/' target='_blank'><i className="icon-instagram"/></a>
            </h1>
            <div className="navigation-panel">
                <div className="container">
                    <div className="row justify-content-between">
                        <p className="col-3"><a href='/'>Home</a></p>
                        <ul className="col-3">
                            <p>Categories</p>
                            <li>
                                <ul><a href='/categories'>All</a></ul>
                                {categories.map((category) => {
                                    return <ul key={category.id}><a href={'/categories/' + category.name}>{category.name}</a></ul>
                                })}
                            </li>
                        </ul>
                        <p className="col-3"><a href='/sessions'>Sessions</a></p>
                        <p className="col-3"><a href='/about_me'>About me</a></p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;