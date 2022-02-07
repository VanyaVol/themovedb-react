import React from 'react';
import {Link, NavLink} from 'react-router-dom';

import css from './Header.module.css';
import headerLogo from './../../assets/images/theMovieDB_logo.png';

const Header = () => {
    return (<header className={css.header}>
        <NavLink to={'/'}>
            <img src={headerLogo} alt='The movie db logo'/>
        </NavLink>

        <div className={css.menu}>
            <ul className={css.menuItem}>
                <li>
                    <NavLink to={'genres'}>Genres</NavLink>
                </li>
                <li>
                    <Link to={'movies'}>Movies</Link>
                        <div className={css.subMenu}>
                            <ul>
                                <li className={css.subMenuItems}>
                                    <NavLink to={'popular'}>Popular</NavLink>
                                </li>
                                <li className={css.subMenuItems}>
                                    <NavLink to={'popular'}>Trends</NavLink>
                                </li>
                                <li className={css.subMenuItems}>
                                    <NavLink to={'popular'}>TOP</NavLink>
                                </li>
                            </ul>
                        </div>
                </li>
                <li>
                    <NavLink to={'#'}>TV</NavLink>
                </li>
                <li>
                    <NavLink to={'#'}>Anime</NavLink>
                </li>
            </ul>

            <div className={css.signInBlock}>
                <form className={css.formBlock}>
                    <label>
                        <input type='search' placeholder={'Search'} className={css.search}/>
                    </label>
                    <input type='submit' value='' className={css.btnSearch}/>
                </form>
                <Link to={'login'} className={css.btnLogin}>Sign In</Link>
            </div>
        </div>

    </header>);
};

export {Header};
