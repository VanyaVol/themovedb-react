import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getMoviesById} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import {urlsConst} from "../../constansts/urls";

const MovieDetails = () => {
    const dispatch = useDispatch();
    const {movie} = useSelector(state => state['themoviedbReducer']);

    const {id} = useParams();

    const {backdrop_path} = movie;

    console.log(movie)

    useEffect(() => {
        dispatch(getMoviesById(id));
    }, []);

    return (
        <div>
            <img src={movie.backdrop_path ? urlsConst.imageOriginal+movie.backdrop_path: urlsConst.imageNoneImg} alt=""/>

        </div>
    );
}

export {MovieDetails};
