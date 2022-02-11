import React, {useEffect} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';

import css from './Header.module.css';
import headerLogo from './../../assets/images/theMovieDB_logo.png';
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {changeGenreId, changePage, changeSearch, getGenres} from "../../store";
import themoviedbReducer from "../../store/themoviedb.slice";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, reset, handleSubmit} = useForm();
    const {genres} = useSelector(state => state['themoviedbReducer']);

    const onSubmitF = (data) => {
        dispatch(changeSearch(data.search));
        dispatch(changePage({page: 1}));
        navigate('/movies');
        reset();
    }

    useEffect(() => {
        dispatch(getGenres())
    }, []);

    return (<header className={css.header}>
        <NavLink to={'/'}>
            <img src={headerLogo} alt='The movie db logo'/>
        </NavLink>

        <div className={css.menu}>
            <ul className={css.menuItem}>
                <li>
                    <NavLink to={'#'}>Genres</NavLink>
                    <div className={css.subMenu}>
                        <ul>
                            {genres.map(itemGenre => (
                                <li className={css.subMenuItems} key={itemGenre.id}>
                                    <Link to={'movies'} onClick={() => {
                                        dispatch(changeGenreId(itemGenre.id));
                                        console.log(itemGenre.id)
                                    }}>{itemGenre.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </li>

                <li>
                    <Link to={'movies'} onClick={() => {
                        dispatch(changeSearch(''))
                        dispatch(changeGenreId(''))
                        dispatch(changePage({page: 1}))
                    }}>Movies</Link>
                </li>
                <li>
                    <NavLink to={'#'}>TV</NavLink>
                </li>
                <li>
                    <NavLink to={'#'}>Anime</NavLink>
                </li>
            </ul>

            <div className={css.signInBlock}>
                <form className={css.formBlock} onSubmit={handleSubmit(onSubmitF)}>
                    <label>
                        <input type='search' {...register('search')} placeholder={'Search'} className={css.search}/>
                    </label>
                    <input type='submit' value='' className={css.btnSearch}/>
                </form>
                <Link to={'login'} className={css.btnLogin}>Sign In</Link>
            </div>
        </div>

    </header>);
};

export {Header};
