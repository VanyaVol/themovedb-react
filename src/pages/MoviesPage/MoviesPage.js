import React from "react";

import css from "./MoviesPages.module.css";
import {MoviesList} from "../../components";

const MoviesPage = () => {
    return (
        <div className={css.moviesPage}>
            <MoviesList/>
        </div>
    );
};

export {MoviesPage};
