import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './backButton.css';

const BackButton = () => {
    const location = useLocation();
    const pathname = location.pathname || '/';
    const arr = pathname.split('/');
    const currPage = arr[arr.length - 1];
    const parentPath = arr
        .filter((item) => {
            return item !== currPage;
        })
        .join('/');
    return <Link to={parentPath}>{<img className='back' src='src/assets/back.png'></img>}</Link>;
};

export default BackButton;