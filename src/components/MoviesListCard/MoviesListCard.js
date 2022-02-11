import React from 'react';
import {Link} from "react-router-dom";
import css from './MoviesListCard.module.css';

import {urlsConst} from '../../constansts/urls';
import {urls} from '../../configs/urls';

const MoviesListCard = ({movie}) => {
    const {id, title, poster_path, release_date, genres} = movie;

    return (
        <div className={css.cardBlock}>
            <div className={css.card}>
                <Link to={`${urls.movies}/${id}`}>
                    <img src={!!poster_path ? urlsConst.imageW500 + poster_path : urlsConst.imageNoneImg} alt={title}/>
                </Link>

                <div className={css.title}>
                    <Link to={`${urls.movies}/${id}`}>{title}</Link>
                </div>

                <div className={css.genresBlock}>
                    {genres?.map(itemGenre => <span className={css.genres} key={itemGenre.id}>{itemGenre.genres}</span>)}
                </div>

                <div className={css.date}>
                    <span>{release_date}</span>
                </div>
            </div>

            <div className={css.btn}>
                <Link to={`${urls.movies}/${id}`}>Details</Link>
            </div>
        </div>
    );
};

export {MoviesListCard};
