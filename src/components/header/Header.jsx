import React from 'react';
import style from '../../css/header.module.css';
import { Link } from 'react-router-dom';
import LocationSearchInput from './Search';

function Header() {

    return (
        <div className={style.wrap}>
            <div className={style.navigation}>
                <Link to='/'>Main</Link>
                <Link to='/today'>Today</Link>
                <Link to='/tomorrow'>Tomorrow</Link>
                <Link to='/week'>Week</Link>
            </div>
            <div className={style.search}>
                <LocationSearchInput />
            </div>
        </div>
    );
}

export default Header;
