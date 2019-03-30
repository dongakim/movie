import React, { useContext, useEffect } from "react";
import './movie.css';

import { MovieContext } from "../../stores/MovieStore";
import * as movieActions from "../../stores/actions/movieActions";
import { makeImageUrl, sizeTypes } from "../../api/api";

const Movie = ({ location, match }) => {
    const { movieState, dispatchMovie } = useContext(MovieContext);
    const data = location.state;
    const backdropStyle = { backgroundImage: `url(${makeImageUrl(sizeTypes.w780, data.backdrop_path)})` }

    useEffect(() => {
        getMovieDetail()
        return () => dispatchMovie(movieActions.resetMovie());
    }, []);

    const getMovieDetail = () => {
        dispatchMovie(
            movieActions.fetchMovie(match.params.id)(dispatchMovie));
        dispatchMovie(
            movieActions.fetchImages(match.params.id)(dispatchMovie));
        dispatchMovie(
            movieActions.fetchCredits(match.params.id)(dispatchMovie));
        dispatchMovie(
            movieActions.fetchRecommendations(match.params.id)(dispatchMovie));
    }

    return <div className="movie-page">
        <div className="backdrop-area-wrap">
            <div className="backdrop-area" style={backdropStyle}>
                <div className="backdrop-area-blur left"></div>
                <div className="backdrop-area-blur right"></div>
                <div className="backdrop-area-cover"></div>
            </div>
        </div>
        <div className="movie-page-info-section">
            <img className="movie-page-poster" src={makeImageUrl(sizeTypes.w500, data.poster_path)} alt="" />
            <div className="movie-page-desc">
                <div className="movie-page-desc-inner">
                    <h1 className="movie-page-desc-title">{data.title}</h1>
                    <p className="movie-page-desc-infos">{movieState.detail.release_date ? movieState.detail.release_date.replace(/-/gi, '.') : ''} 개봉&ensp;|&ensp;{movieState.detail.genres ? movieState.detail.genres.map(genre => genre.name).join('·') : ''}&ensp;|&ensp;평점 ★{movieState.detail.vote_average}</p>
                    <hr className="movie-page-desc-hr" />
                    <p className="movie-page-desc-overview">{movieState.detail.overview}</p>
                </div>

            </div>
        </div>
        <div className="movie-page-subinfo-section">
            <div className="movie-page-subinfo-section-row">
                <div className="movie-page-subinfo-section-container">
                    <h2 className="movie-page-subinfo-title">주요 출연진</h2>
                </div>
                <div className="movie-page-subinfo-body">
                    {movieState.casts.length ? movieState.casts.map(cast => {
                        return (<div key={cast.cast_id} className="movie-page-subinfo-body-item subinfo-profile-item">
                            <div className="subinfo-profile-item-profile" style={{ backgroundImage: `url(${makeImageUrl(sizeTypes.w185, cast.profile_path)})` }}></div>
                            <h3>{cast.name}</h3>
                            <p>{cast.character}</p>
                        </div>)
                    }) : ''}
                </div>
            </div>
            <div className="movie-page-subinfo-section-row">
                <div className="movie-page-subinfo-section-container">
                    <h2 className="movie-page-subinfo-title">추천 영화</h2>
                </div>
                <div className="movie-page-subinfo-body">
                    {movieState.recommendations.length ? movieState.recommendations.map(movie => {
                        return (<div key={movie.id} className="movie-page-subinfo-body-item subinfo-movie-item">
                            <div className="subinfo-movie-item-poster" style={{ backgroundImage: `url(${makeImageUrl(sizeTypes.w185, movie.poster_path)})` }}></div>
                            {/* <img src={makeImageUrl(sizeTypes.w185, movie.poster_path)} alt="" /> */}
                            <h3 className="subinfo-movie-item-title">{movie.title}</h3>
                            <p>{movie.release_date.split('-')[0]}</p>
                        </div>)
                    }) : ''}
                </div>
            </div>
        </div>
    </div>
}

export default Movie;