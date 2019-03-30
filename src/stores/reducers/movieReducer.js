import * as movieActions from "../actions/movieActions";

export const initialMovieState = {
    list: [],
    movieType: 'newPlaying',
    query: '',
    page: 1,
    detail: {},
    genres: [],
    backdrops: [],
    casts: [],
    recommendations: [],
    isScrollEnd: false
}

const movieReducer = (state = initialMovieState, { type, payload }) => {
    switch (type) {
        case movieActions.SET_MOVIES:
            return {
                ...state,
                list: payload
            };
        case movieActions.SET_MOVIE_TYPE:
            return {
                ...state,
                movieType: payload
            }
        case movieActions.SET_QUERY:
            return {
                ...state,
                query: payload
            }
        case movieActions.ADD_MOVIES:
            return {
                ...state,
                list: [...state.list, ...payload.movies],
                page: state.page + 1
            }
        case movieActions.SET_MOVIE:
            return {
                ...state,
                detail: payload
            }
        case movieActions.SET_GENRES:
            return {
                ...state,
                genres: payload
            }
        case movieActions.SET_BACKDROPS:
            // console.log(payload)
            return {
                ...state,
                backdrops: payload
            }
        case movieActions.SET_CASTS:
            return {
                ...state,
                casts: payload
            }
        case movieActions.SET_RECOMMENDATIONS:
            return {
                ...state,
                recommendations: payload
            }
        case movieActions.RESET_MOVIE:
            return {
                ...state,
                detail: {},
                backdrops: [],
                casts: [],
                recommendations: []
            }
        case movieActions.IS_SCROLL_END:
            return {
                ...state,
                isScrollEnd: payload
            }
        case movieActions.SET_PAGE:
            return {
                ...state,
                page: payload
            }
        default:
            return state
    }
}

export default movieReducer