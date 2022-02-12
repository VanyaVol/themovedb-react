import React from 'react';

import css from "./GenreBadge.module.css";


const GenreBadge = ({genre}) => {
    return (
        <span className={css.genre}>
            {genre.name}
        </span>
    );
};

export {GenreBadge};
