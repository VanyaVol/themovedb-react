import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import css from "./MoviesList.module.css"
import {getDiscoverMovies, getNewestMovies, getSearchMovie} from "../../store";
import {MoviesListCard, Pagination, Loading} from "../../components";

const MoviesList = () => {
    const {movies, status, page, search, genreId} = useSelector(state => state["themoviedbReducer"]);
    const dispatch = useDispatch();

    const {results: moviesArray} = movies;

    useEffect(() => {
        if (!!search) {
            dispatch(getSearchMovie({search, page}));
        } else if (!!genreId) {
            dispatch(getDiscoverMovies({genreId, page}));
        } else {
            dispatch(getNewestMovies({page}));
        }
    }, [page, search, genreId]);

    return (
        <div>
            <div className={css.listMovies}>
                {status === "pending" ? <Loading/> : moviesArray?.map(itemMovie => <MoviesListCard key={itemMovie.id}
                                                                                                   movie={itemMovie}/>)}
            </div>

            {!moviesArray?.length && <div>{"No results"}</div>}

            <Pagination/>
        </div>
    );
};

export {MoviesList};
