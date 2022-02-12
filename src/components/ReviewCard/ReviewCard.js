import React from "react";

import css from "./ReviewCard.module.css"

const ReviewCard = ({review}) => {
    return (
        <div className={css.reviewBlock}>
            <p className={css.author}>{review.author}</p>
            <p className={css.time}>{review.created_at}</p>
            <div className={css.content}>
                <p>{review.content}</p>
            </div>
        </div>
    );
};

export {ReviewCard};
