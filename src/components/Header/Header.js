import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import ReactSwitch from "react-switch";

import css from "./Header.module.css";
import headerLogo from "./../../assets/images/theMovieDB_logo.png";
import {changeGenreId, changePage, changeSearch, changeTheme, getGenres} from "../../store";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, reset, handleSubmit} = useForm();
    const {genres, theme} = useSelector(state => state['themoviedbReducer']);

    const onSubmitF = (data) => {
        dispatch(changeSearch(data.search));
        dispatch(changePage({page: 1}));
        navigate("/movies");
        reset();
    }

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        dispatch(getGenres());
    }, [checked]);

    return (<header className={css.headerBlock}>
        <div className={css.header}>
            <Link to={"/"} onClick={() => {
                dispatch(changeSearch(null));
                dispatch(changeGenreId(null));
                dispatch(changePage({page: 1}));
            }}>
                <img src={headerLogo} alt="The movie db logo"/>
            </Link>

            <div className={css.menu}>
                <ul className={css.menuItem}>
                    <li>
                        <Link to={"#"}>Genres</Link>
                        <div className={css.subMenu}>
                            <ul>
                                {genres.map(itemGenre => (
                                    <li className={css.subMenuItems} key={itemGenre.id}>
                                        <Link to={"movies"} onClick={() => {
                                            dispatch(changeGenreId(itemGenre.id));
                                            dispatch(changeSearch(null));
                                            dispatch(changePage({page: 1}))
                                        }}>{itemGenre.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </li>

                    <li>
                        <Link to={"movies"} onClick={() => {
                            dispatch(changeSearch(null))
                            dispatch(changeGenreId(null))
                            dispatch(changePage({page: 1}))
                        }}>Movies</Link>
                    </li>

                </ul>

                <div className={css.signInBlock}>
                    <ReactSwitch checked={checked} onChange={() => {
                        setChecked(!checked);
                        if (theme === "dark") {
                            dispatch(changeTheme("light"));
                        } else {
                            dispatch(changeTheme("dark"));
                        }
                    }} checkedIcon={false} uncheckedIcon={false} onColor={"#000000"} offColor={"#ffffff"}
                                 onHandleColor={"#ffffff"} offHandleColor={"#000000"} handleDiameter={30}/>

                    <form className={css.formBlock} onSubmit={handleSubmit(onSubmitF)}>
                        <label>
                            <input type="search" {...register("search")}
                                   placeholder={"Search"} className={css.search}/>
                        </label>
                        <input type="submit" value="" className={css.btnSearch}/>
                    </form>
                    <Link to={"login"} className={css.btnLogin}>Sign In</Link>
                </div>
            </div>
        </div>
    </header>);
};

export {Header};
