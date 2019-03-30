import { makeUrl, urlTypes } from "../../api/api";

// Actions
export const SET_MOVIES = "SET_MOVIES";
export const SET_MOVIE_TYPE = "SET_MOVIE_TYPE"
export const ADD_MOVIES = "ADD_MOVIES";
export const SET_MOVIE = "SET_MOVIE";
export const SET_GENRES = "SET_GENRES";
export const SET_BACKDROPS = "SET_BACKDROPS";
export const SET_CASTS = "SET_CASTS";
export const RESET_MOVIE = "RESET_MOVIE";
export const SET_RECOMMENDATIONS = "SET_RECOMMENDATIONS";
export const SET_PAGE = "SET_PAGE";
export const SET_QUERY = "SET_QUERY";
export const IS_SCROLL_END = "IS_SCROLL_END";

// Action Creators
export const setMovies = (movies) => {
    return {
        type: SET_MOVIES,
        payload: movies
    }
}

export const setMovieType = (type) => {
    return {
        type: SET_MOVIE_TYPE,
        payload: type
    }
}

export const addMovies = (payload) => {
    return {
        type: ADD_MOVIES,
        payload
    }
}

export const setMovie = (movie) => {
    return {
        type: SET_MOVIE,
        payload: movie
    }
}

export const setGenres = (genres) => {
    return {
        type: SET_GENRES,
        payload: genres
    }
}

export const setBackdrops = (backdrops) => {
    return {
        type: SET_BACKDROPS,
        payload: backdrops
    }
}

export const setCasts = (casts) => {
    return {
        type: SET_CASTS,
        payload: casts
    }
}

export const resetMovie = () => {
    return {
        type: RESET_MOVIE,
        payload: null
    }
}

export const setRecommendations = (Recommendations) => {
    return {
        type: SET_RECOMMENDATIONS,
        payload: Recommendations
    }
}

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        payload: page
    }
}

export const setQuery = (query) => {
    return {
        type: SET_QUERY,
        payload: query
    }
}

export const isScrollEnd = (bool) => {
    return {
        type: IS_SCROLL_END,
        payload: bool
    }
}

export const fetchMovies = (type, params = {}) => {
    return (dispatch) => {
        return fetch(makeUrl(urlTypes[type], params))
            .then(res => res.json())
            .then(json => {
                dispatch(isScrollEnd(false))
                dispatch(addMovies({ movies: json.results }));
            })
    }
}

export const fetchMovie = (movieId) => {
    return (dispatch) => {
        return fetch(makeUrl(`movie/${movieId}`))
            .then(res => res.json())
            .then(json => dispatch(setMovie(json)));
    }
}

export const fetchGenres = () => {
    return (dispatch) => {
        return fetch(makeUrl(urlTypes.genres))
            .then(res => res.json())
            .then(json => dispatch(setGenres(json.genres)));
    }
}

export const fetchImages = (movieId) => {
    return (dispatch) => {
        return fetch(makeUrl(`movie/${movieId}/images`).replace(/language=ko-KR&/, ''))
            .then(res => res.json())
            .then(json => dispatch(setBackdrops(json.backdrops)));
    }
}

export const fetchCredits = (movieId) => {
    return (dispatch) => {
        return fetch(makeUrl(`movie/${movieId}/credits`))
            .then(res => res.json())
            .then(json => dispatch(setCasts(json.cast.slice(0, 10))));
    }
}

export const fetchRecommendations = (movieId) => {
    return (dispatch) => {
        return fetch(makeUrl(`movie/${movieId}/recommendations`))
            .then(res => res.json())
            .then(json => dispatch(setRecommendations(json.results)))
    }
}

export const fetchSearchMovie = (query) => {
    return (dispatch) => {
        return fetch(makeUrl(urlTypes.search, { query }))
            .then(res => res.json())
            .then(json => {
                dispatch(setMovieType('search'))
                dispatch(setQuery(query));
                dispatch(setMovies(json.results));
                dispatch(setPage(2));
            });
    }
}