import React from "react";
import "./movieItem.css";
import { makeImageUrl, sizeTypes } from "../../api/api";

const MovieItem = ({ movie }) => {
    return <div className="movie-item-comp">
        <img className="movie-item-comp-cover" src={makeImageUrl(sizeTypes.w500, movie.poster_path)} alt="" />
        <div className="movie-item-comp-desc">
            <h2 className="movie-item-comp-desc-title">{movie.title}</h2>
            <p className="movie-item-comp-desc-year">{movie.release_date.split('-')[0]}</p>
        </div>
    </div>
}

export default MovieItem