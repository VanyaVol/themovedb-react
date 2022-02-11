import React from 'react';
import {changePage} from "../../store";
import {useDispatch, useSelector} from "react-redux";
import css from './Pagination.module.css';


const Pagination = () => {
    const {movies, page} = useSelector(state => state['themoviedbReducer']);
    const dispatch = useDispatch();
    const {total_pages} = movies;


    return (<div className={css.pagination}>
            <button className={page <= 1 ? `${css.btn} ${css.activeBtn}` : `${css.btn}`} onClick={(e) => {
                e.preventDefault();
                dispatch(changePage({page: 1}))
            }} disabled={page <= 1}>{1}
            </button>

            <button onClick={(e) => {
                e.preventDefault();
                dispatch(changePage({page: page - 2}));
            }} className={page >= 4 ? css.btn : css.hidden}>
                ...
            </button>

            <button onClick={(e) => {
                e.preventDefault();
                dispatch(changePage({page: page - 1}))
            }} className={page >= 3 ? `${css.active} + ${css.btn}` : css.hidden}>{page - 1}</button>

            <button onClick={(e) => {
                e.preventDefault();
                dispatch(changePage({page: page}))
            }}
                    className={page < 2 ? css.hidden : `${css.btn} + ${css.activeBtn}` && page === total_pages ? css.hidden : `${css.btn} + ${css.activeBtn}`}>
                {page}
            </button>

            <button onClick={(e) => {
                e.preventDefault();
                dispatch(changePage({page: page >= total_pages ? page - 1 : page + 1}))
            }}
                    className={page >= total_pages - 1 ? css.hidden : `${css.active} + ${css.btn}`}>
                {page >= total_pages ? page - 1 : page + 1}
            </button>

            <button onClick={(e) => {
                e.preventDefault();
                dispatch(changePage({page: page + 2}));
            }} className={page <= total_pages - 3 ? css.btn : css.hidden}>
                ...
            </button>

            <button
                className={total_pages <= 1 ? `${css.hidden}` : `${css.active}` && page >= total_pages ? `${css.btn} ${css.activeBtn}` : `${css.btn}`}
                onClick={(e) => {
                    e.preventDefault();
                    dispatch(changePage({page: total_pages}))
                }} disabled={page >= total_pages}>{total_pages}</button>

        </div>

    );
};

export {Pagination};
