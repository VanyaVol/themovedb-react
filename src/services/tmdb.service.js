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
    }).then(value => value.data)
}

export {theMovieDbService}