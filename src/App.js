import {Routes, Route} from 'react-router-dom';

import './App.css';
import {Layout, MovieDetails} from "./components";
import {Homepage, MoviesPage, NotFoundPage} from "./pages";

function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<Layout/>}>
                    <Route path={'/'} element={<Homepage/>}/>
                    <Route path={'movies'} element={<MoviesPage/>}/>
                    <Route path={'movies/:id'} element={<MovieDetails/>}/>
                    <Route path={'*'} element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </>
    );
}

export default App;
