import React from "react";

import css from "./Loading.module.css";

const Loading = () => {
    return (
        <div className={css.loading}>
            <div className={css.circle}>
                <div className={css.text}>
                    Loading ...
                </div>
            </div>
        </div>
    );
};

export {Loading};
