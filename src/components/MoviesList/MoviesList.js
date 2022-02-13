import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import css from "./MoviesList.module.css"
import {changePage, getDiscoverMovies, getNewestMovies, getSearchMovie} from "../../store";
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
        document.documentElement.scrollTop = 0;
    }, [page, search, genreId]);

    return (
        <div>
            <div className={css.listMovies} id={'topScreen'}>
                {status === "pending" ? <Loading/> : moviesArray?.map(itemMovie => <MoviesListCard key={itemMovie.id}
                                                                                                   movie={itemMovie}/>)}
            </div>

            {(!moviesArray?.length && !!search) && <div className={css.text}>{"No results"}</div>}

            <Pagination/>
        </div>
    );
};

export {MoviesList};
