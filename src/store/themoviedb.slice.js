import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {theMovieDbService} from "../services";

const initialState = {
    movies: [], search: null, trigger: false, movie: {}, page: 1, status: null, errors: null, genres: [], genreId: null
}

const genresToMovie = (moviesArray, genres) => {
    for (let i = 0; i < moviesArray.results.length; i++) {
        moviesArray.results[i].genres = [];
        for (let j = 0; j < moviesArray.results[i].genre_ids.length; j++) {
            for (let k = 0; k < genres.length; k++) {
                if (moviesArray.results[i].genre_ids[j] === genres[k].id) {
                    moviesArray.results[i].genres.push({genres: genres[k].name, id: genres[k].id});
                }
            }

        }
    }
}

export const getNewestMovies = createAsyncThunk('themoviedbSlice/getNewestMovies', async (page) => {
    try {
        const genres = await theMovieDbService.getGenres();
        const moviesArray = await theMovieDbService.getNewestMovies(page);
        return {moviesArray, genres}
    } catch (e) {
        return await e.message();
    }
});

export const getGenres = createAsyncThunk('themoviedbSlice/getGenres', async () => {
    try {
        const {genres} = await theMovieDbService.getGenres();

        console.log(genres);
        return genres;
    } catch (e) {
        return await e.message();
    }
});

export const getMoviesById = createAsyncThunk('themoviedbSlice/getMoviesById', async (id) => {
    return await theMovieDbService.getMovieByID(id);
})

export const getSearchMovie = createAsyncThunk('themoviedbSlice/getSearchMovie', async ({search, page}) => {
    try {
        const moviesArray = await theMovieDbService.getSearchMovies(search, page)
        const genres = await theMovieDbService.getGenres();
        return {moviesArray, genres};
    } catch (e) {
        console.log(e.message());
    }
});

export const getDiscoverMovies = createAsyncThunk(
    'themoviedbSlice/getDiscoverMovies',
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
    name: 'themoviedbSlice', initialState: initialState, reducers: {
        changePage: (state, action) => {
            state.page = action.payload.page;
        }, changeTrigger: (state, action) => {
            state.trigger = !state.trigger;
        }, changeSearch: (state, action) => {
            state.search = null;
            state.search = action.payload;
        }, changeGenreId: (state, action) => {
            state.genreId = null;
            state.genreId = action.payload;
        }
    }, extraReducers: {
        [getNewestMovies.pending]: (state, action) => {
            state.status = 'pending';
            state.errors = null;
        }, [getNewestMovies.fulfilled]: (state, action) => {

            state.status = 'fulfilled';

            const {genres} = action.payload.genres;
            const moviesArray = action.payload.moviesArray;

            genresToMovie(moviesArray, genres);

            state.movies = action.payload.moviesArray;

        }, [getNewestMovies.rejected]: (state, action) => {
            state.errors = action.payload;
        }, [getMoviesById.fulfilled]: (state, action) => {
            state.movie = action.payload;
        }, [getSearchMovie.fulfilled]: (state, action) => {

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
            console.log(moviesArray)
            // state.genreId = null;
        },

    }
});

const themoviedbReducer = themoviedbSlice.reducer;

export default themoviedbReducer;

export const {changePage, changeTrigger, changeSearch, changeGenreId} = themoviedbSlice.actions;