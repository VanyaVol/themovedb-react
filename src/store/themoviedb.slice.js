import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

import {theMovieDbService} from "../services";

const initialState = {
    movies: [],
    search: null,
    movie: {},
    page: 1,
    status: null,
    genres: [],
    genreId: null,
    videos: [],
    theme: "dark",
    reviews: []
}

const genresToMovie = (moviesArray, genres) => {
    for (let i = 0; i < moviesArray.results.length; i++) {
        moviesArray.results[i].genres = [];
        for (let j = 0; j < moviesArray.results[i].genre_ids.length; j++) {
            for (let k = 0; k < genres.length; k++) {
                if (moviesArray.results[i].genre_ids[j] === genres[k].id) {
                    moviesArray.results[i].genres.push({name: genres[k].name, id: genres[k].id});
                }
            }
        }
    }
}

export const getNewestMovies = createAsyncThunk(
    "themoviedbSlice/getNewestMovies",
    async ({page}) => {
        try {
            const genres = await theMovieDbService.getGenres();
            const moviesArray = await theMovieDbService.getNewestMovies(page);
            return {moviesArray, genres}
        } catch (e) {
            return await e.message();
        }
    });

export const getReviewsById = createAsyncThunk(
    "themoviedbSlice/getReviewsById",
    async ({id}) => {
        try {
            return  theMovieDbService.getReviewsById(id);
        } catch (e) {
            console.log(e.message());
        }
    });

export const getGenres = createAsyncThunk(
    "themoviedbSlice/getGenres",
    async () => {
        try {
            const {genres} = await theMovieDbService.getGenres();
            return genres;
        } catch (e) {
            return await e.message();
        }
    });

export const getMoviesById = createAsyncThunk(
    "themoviedbSlice/getMoviesById",
    async ({id}) => {
        return await theMovieDbService.getMovieByID(id);
    })

export const getSearchMovie = createAsyncThunk(
    "themoviedbSlice/getSearchMovie",
    async ({search, page}) => {
        try {
            const moviesArray = await theMovieDbService.getSearchMovies(search, page);
            const genres = await theMovieDbService.getGenres();
            return {moviesArray, genres};
        } catch (e) {
            console.log(e.message());
        }
    });

export const getVideoById = createAsyncThunk(
    "themoviedbSlice/getVideoById",
    async ({id}) => {
        try {
            return await theMovieDbService.getVideoByIdMovie(id);
        } catch (e) {
            console.log(e.message());
        }
    });

export const getDiscoverMovies = createAsyncThunk(
    "themoviedbSlice/getDiscoverMovies",
    async ({genreId, page}) => {
        try {
            const moviesArray = await theMovieDbService.getDiscoverMovie(genreId, page)
            const genres = await theMovieDbService.getGenres();
            return {moviesArray, genres};
        } catch (e) {
            console.log(e.message());
        }
    });

const themoviedbSlice = createSlice({
    name: "themoviedbSlice",
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload.page;
        },
        changeSearch: (state, action) => {
            state.search = null;
            state.search = action.payload;
        },
        changeGenreId: (state, action) => {
            state.genreId = null;
            state.genreId = action.payload;
        },
        changeTheme: (state, action) => {
            state.theme = action.payload;
        }
    },
    extraReducers: {
        [getNewestMovies.pending]: (state) => {
            state.status = "pending";},
        [getNewestMovies.fulfilled]: (state, action) => {
            const {genres} = action.payload.genres;
            const moviesArray = action.payload.moviesArray;

            state.status = "fulfilled";
            state.movies = action.payload.moviesArray;

            genresToMovie(moviesArray, genres);
        },
        [getMoviesById.pending]: (state) => {
            state.status = "pending";
        },
        [getMoviesById.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.movie = action.payload;
        },
        [getSearchMovie.fulfilled]: (state, action) => {
            const {genres} = action.payload.genres;
            const moviesArray = action.payload.moviesArray;

            genresToMovie(moviesArray, genres);

            state.movies = action.payload.moviesArray;
        },
        [getGenres.fulfilled]: (state, action) => {
            state.genres = action.payload;
        },
        [getDiscoverMovies.fulfilled]: (state, action) => {
            const {genres} = action.payload.genres;
            const moviesArray = action.payload.moviesArray;

            genresToMovie(moviesArray, genres);

            state.movies = action.payload.moviesArray;
        },
        [getVideoById.fulfilled]: (state, action) => {
            state.videos = action.payload;
        },
        [getReviewsById.fulfilled]: (state, action) =>  {
            state.reviews = action.payload;
        }
    }
});

const themoviedbReducer = themoviedbSlice.reducer;

export default themoviedbReducer;

export const {changePage, changeTheme, changeSearch, changeGenreId} = themoviedbSlice.actions;