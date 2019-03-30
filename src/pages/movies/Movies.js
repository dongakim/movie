import React, { useContext, useEffect } from "react";
import "./movies.css";
import { Link } from "react-router-dom";

import { MovieContext } from "../../stores/MovieStore";
import * as movieActions from "../../stores/actions/movieActions";

import MovieItem from "../../components/movieItem/MovieItem.js";
import Header from "../../components/header/Header.js";


const Movies = () => {
    const { movieState, dispatchMovie } = useContext(MovieContext);

    useEffect(() => {
        if (!movieState.list.length) addMovies(movieState.movieType);
        dispatchMovie(movieActions.fetchGenres()(dispatchMovie))
        window.addEventListener('scroll', scrollEvent);
        return () => window.removeEventListener('scroll', scrollEvent);
    }, [])

    useEffect(() => {
        if (movieState.isScrollEnd) addMovies(movieState.movieType, { page: movieState.page, query: movieState.query })
    }, [movieState])

    const addMovies = (type, params = {}) => {
        dispatchMovie(movieActions.fetchMovies(type, params)(dispatchMovie))
    }

    const scrollEvent = () => {
        const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        const clientHeight = document.documentElement.clientHeight
        if (Math.ceil(scrollTop + clientHeight) >= scrollHeight) {
            dispatchMovie(movieActions.isScrollEnd(true));
        }
    }

    const renderMovies = () => {
        return movieState.list.map(movieData => (
            <li className="movie-item" key={movieData.id}>
                <Link key={movieData.id} to={{ pathname: `/movie/${movieData.id}`, state: movieData }}>
                    <MovieItem movie={movieData} />
                </Link>
            </li>
        ))
    }

    return <div className="movies">
        <div className="container">
            <Header></Header>
            <ul className="movie-list">
                {renderMovies()}
            </ul>
        </div>

    </div>
}

export default Movies;