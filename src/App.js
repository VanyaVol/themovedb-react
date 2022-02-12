import {useEffect} from "react";
import {useSelector} from "react-redux";
import {Routes, Route, Navigate} from "react-router-dom";

import {Layout, MovieDetails} from "./components";
import {MoviesPage, NotFoundPage} from "./pages";

function App() {
    const {theme} = useSelector(state => state["themoviedbReducer"]);

    useEffect(() => {
        document.documentElement.setAttribute("class", theme);
    }, [theme]);

    return (
        <>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route path={"/"} element={<Navigate to={"movies"}/>}/>
                    <Route path={"movies"} element={<MoviesPage/>}/>
                    <Route path={"movies/:id"} element={<MovieDetails/>}/>
                    <Route path={"*"} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
