import React from "react";
import "./app.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import MovieStore from "./stores/MovieStore";
import Movies from "./pages/movies/Movies.js";
import Movie from "./pages/movie/Movie.js";
// import Header from "./components/header/Header.js";

const App = () => {
    return (
        <Router>
            <Switch>
                <MovieStore>
                    <Route path={"/"} exact component={Movies}></Route>
                    <Route path={"/movie/:id"} component={Movie}></Route>
                </MovieStore>
            </Switch>
        </Router>
    );
}

export default App;
