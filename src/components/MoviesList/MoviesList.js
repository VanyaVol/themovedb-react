import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {changePage, getNewestMovies} from "../../store";
import {MoviesListCard} from "../../components";
import css from './MoviesList.module.css'


const MoviesList = () => {
    const dispatch = useDispatch();

    const {movies, status, error, page} = useSelector(state => state['themoviedbReducer']);

    const {results: moviesArray, total_pages} = movies;

    useEffect(() => {
        dispatch(changePage({page: 1}));
        dispatch(getNewestMovies());
    }, []);

    useEffect(() => {
        dispatch(getNewestMovies(page));
    }, [page])

    console.log(movies)

    return (
        <div className={css.listMovies}>
            {moviesArray?.map(itemMovie => <MoviesListCard key={itemMovie.id} movie={itemMovie}/>)}
            <button onClick={(e) => {
                e.preventDefault();
                dispatch(changePage({page: 1}))
            }} disabled={page <= 1 ? true : false}>1
            </button>
            <button onClick={(e) => {
                e.preventDefault();
                dispatch(changePage({page: page}))
            }} style={page===1? {display:'none'}: {display: 'block'}}>{page}</button>
            <button onClick={(e) => {
                e.preventDefault();
                dispatch(changePage({page: page >= total_pages ? page - 2 : page + 1}))
            }}>{page >= total_pages ? page - 2 : page + 1}</button>
            <button onClick={(e) => {
                e.preventDefault();
                dispatch(changePage({page: page >= total_pages ? page - 1 : page + 2}))
            }}>{page >= total_pages ? page - 1 : page + 2}</button>
            <button onClick={(e) => {
                e.preventDefault();
                dispatch(changePage({page: total_pages}))
            }} disabled={page >= total_pages ? true : false}>{total_pages}</button>
        </div>
    );
};

export {MoviesList};
