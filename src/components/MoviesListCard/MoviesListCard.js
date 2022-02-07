import React from 'react';
import {Link} from "react-router-dom";
import css from './MoviesListCard.module.css';

import {urls} from "../../configs/urls";

const MoviesListCard = ({movie}) => {
    const {id, title, poster_path, release_date} = movie;

    return (
        <div className={css.card}>
            <Link to={`${urls.movies}/${id}`}>
                <img src={urls.image + poster_path} alt=""/>
            </Link>

            <div>
                <Link to={`${urls.movies}/${id}`}>{title}</Link>
            </div>
            <div>
                <span>{release_date}</span>
            </div>
        </div>
    );
};

export {MoviesListCard};
