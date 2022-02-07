import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {theMovieDbService} from "../services";

const initialState = {
    movies: [],
    page: 1,
    status: null,
    errors: null
}

export const getNewestMovies = createAsyncThunk(
        'themoviedbSlice/getNewestMovies',
        async (page) => {
            try {
                return await theMovieDbService.getNewestMovies(page);
            } catch (e) {
                return await e.message();
            }
        }
    )
;

const themoviedbSlice = createSlice({
    name: 'themoviedbSlice',
    initialState: initialState,
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload.page;
        }
    }
    ,
    extraReducers: {
        [getNewestMovies.pending]: (state, action) => {
            state.status = 'pending';
            state.errors = null;
        },
        [getNewestMovies.fulfilled]: (state, action) => {
            state.status = 'fulfilled';
            state.movies = action.payload;
        },
        [getNewestMovies.rejected]: (state, action) => {
            state.errors = action.payload;
        }
    }
});

const themoviedbReducer = themoviedbSlice.reducer;

export default themoviedbReducer;

export const {changePage} = themoviedbSlice.actions;