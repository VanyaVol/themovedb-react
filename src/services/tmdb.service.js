import {axiosService} from "./axios.service";
import {urls} from "../configs/urls";

const theMovieDbService = {
    getMovieByID: (id) => axiosService.get(`${urls.movie}/${id}`).then(value => value.data),
    getPoplarMovie: () => axiosService.get(urls.moviePopular).then(value => value.data),
    getGenres: () => axiosService.get(urls.genreMovieList).then(value => value.data),
    getNewestMovies: (page) => axiosService.get(urls.newestMovies, {
        params: {
            page: page
        }
    }).then(value => value.data),
    getTrendMovies: () => axiosService.get(urls.trendingMoviesOfWeek).then(value => value.data),
    getSearchMovies: (query, page) => axiosService.get(urls.searchMovie, {
        params: {
            query: query,
            page: page
        }
    }).then(value => value.data),
    getDiscoverMovie: (idGenre, page)=> axiosService.get(urls.discoverMovies, {
        params: {
            with_genres: idGenre,
            page: page
        }
    }).then(value => value.data),
    getVideoByIdMovie: (id)=> axiosService.get(`${urls.movie}/${id}${urls.videos}`).then(value => value.data)
}

export {theMovieDbService}