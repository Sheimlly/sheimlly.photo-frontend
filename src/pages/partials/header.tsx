import { useState, useEffect } from 'react';
import axios from 'axios';

interface PhotoCategories {
    id: number;
    name: string;
    name_pl: string;
}

const Header = () => {
    const [categories, setCategories] = useState<PhotoCategories[] | []>([]);
    // const [error, setError]: [string, (error: string) => void] = useState("");

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
            <h1>Emilia Lorentsen Fotografia</h1>
            <div className="row navigation-panel">
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
        </header>
    )
}

export default Header;