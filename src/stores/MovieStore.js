import React, { useReducer } from "react";
import movieReducer, { initialMovieState } from "./reducers/movieReducer";

export const MovieContext = React.createContext();

const MovieStore = (props) => {
    const [movieState, dispatchMovie] = useReducer(movieReducer, initialMovieState);

    return (
        <MovieContext.Provider value={{ movieState, dispatchMovie }}>
            {props.children}
        </MovieContext.Provider>
    )
}

export default MovieStore