import React from "react";
import {Outlet} from "react-router-dom";

import css from "./Layout.module.css";
import {Header, Footer} from "./../../components";

const Layout = () => {
    return (<div>
        <Header/>
        <div className={css.wrap}>
            <Outlet/>
        </div>
        <Footer/>
    </div>);
};

export {Layout};
