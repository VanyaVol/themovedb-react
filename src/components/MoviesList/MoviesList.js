import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getDiscoverMovies, getNewestMovies, getSearchMovie} from "../../store";
import {MoviesListCard, Pagination} from "../../components";
import css from './MoviesList.module.css'
import {Loading} from "../Loading/Loading";


const MoviesList = () => {
    const dispatch = useDispatch();

    const {movies, status, error, page, search, trigger, genreId} = useSelector(state => state['themoviedbReducer']);

    const {results: moviesArray} = movies;


    useEffect(() => {
        if (search) {
            dispatch(getSearchMovie({search, page}));
        } else if (genreId) {
            dispatch(getDiscoverMovies({genreId, page}));
        } else {
            dispatch(getNewestMovies(page));
        }
    }, [page, search, genreId]);


    return (
        <div>
            <div className={css.listMovies}>
                {status === 'pending' ? <Loading/> : moviesArray?.map(itemMovie => <MoviesListCard key={itemMovie.id}
                                                                                                   movie={itemMovie}/>)}
            </div>
            {!moviesArray?.length && <div>{'No results'}</div>}

            <Pagination/>

        </div>
    );
};

export {MoviesList};
