import React from "react";

import css from "../NotFoundPage/NotFoundPage.module.css";

const NotFoundPage = () => {
    return (
        <div className={css.notFound}>
            <div className={css.circle}>
                <div className={css.text}>
                    Not found page...
                </div>
            </div>
        </div>
    );
};

export {NotFoundPage};
