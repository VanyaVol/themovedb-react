import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import StarRatings from "react-star-ratings/build/star-ratings";
import Iframe from "react-iframe";

import css from "./MovieDetails.module.css";
import {getMoviesById, getReviewsById, getVideoById} from "../../store";
import {urlsConst} from "../../constansts/urls";
import {Loading} from "../../components";
import {GenreBadge} from "../GenreBadge/GenreBadge";
import {ReviewCard} from "../ReviewCard/ReviewCard";

const MovieDetails = () => {
    const {movie, status, videos, reviews} = useSelector(state => state["themoviedbReducer"]);
    const dispatch = useDispatch();

    const {id} = useParams();

    const {title, backdrop_path, overview, release_date, genres, vote_average} = movie;

    useEffect(() => {
        dispatch(getMoviesById({id}));
        dispatch(getVideoById({id}));
        dispatch(getReviewsById({id}));
    }, []);

    return (<div>
        {status === "pending" ? <Loading/> : <div>
            <div className={css.details}>
                <div className={css.detailsBlock}>
                    <div>
                        <img
                            src={movie.backdrop_path ? urlsConst.imageOriginal + movie.backdrop_path : urlsConst.imageNoneImg}
                            className={css.photo} alt={title}/>
                    </div>

                    <div>
                        <h2 className={css.title}>{title}</h2>
                        <div className={css.genreBlock}>
                            {genres?.map(itemGenre => <GenreBadge key={itemGenre?.id} genre={itemGenre}/>)}
                        </div>
                        <p className={css.overview}>{overview}</p>
                        <span className={css.date}>{release_date}</span>
                        <div className={css.rate}>
                            <h4 className={css.textRating}>{"Rating:"}</h4>
                            <StarRatings rating={vote_average ? vote_average / 2 : 0}
                                         starDimension="30px"
                                         starSpacing="10px" starRatedColor={"#ffcd0e"} starEmptyColor={"#c2c2c2"}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className={css.videoBlock}>
                <h4 className={css.textVideo}>Trailer</h4>
                <div className={css.video}>
                    {videos?.results &&
                        <Iframe width="800" height="400" url={urlsConst.youtubeVideo + videos.results[0]?.key}
                                frameBorder="0"/>}
                </div>
            </div>

            {!!reviews.results?.length && <div className={css.videoBlock}>
                <h2 className={css.textVideo}>{'Reviews'}</h2>
                <div className={css.rateBlock}>
                    {reviews.results && reviews?.results.map(itemReview => <ReviewCard key={itemReview.id}
                                                                                       review={itemReview}/>)}
                </div>
            </div>}
        </div>}
    </div>);
}

export {MovieDetails};
