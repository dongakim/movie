const HOST = "https://api.themoviedb.org/3"
const IMAGE_HOST = "https://image.tmdb.org/t/p"
const KEY = "ca4620d0c14c4fe2ed1600c13de128b7"

export const urlTypes = {
    newPlaying: 'movie/now_playing',
    popular: 'movie/popular',
    topRated: 'movie/top_rated',
    upcoming: 'movie/upcoming',
    genres: 'genre/movie/list',
    search: 'search/movie'
}

export const sizeTypes = {
    w92: 'w92',
    w154: 'w154',
    w185: 'w185',
    w342: 'w342',
    w500: 'w500',
    w780: 'w780'
}

export const makeUrl = (type, params = {}) => {
    const url = `${HOST}/${type}?api_key=${KEY}&language=ko-KR&` + Object.keys(params)
        .map(k => k + '=' + params[k])
        .join('&');
    // console.log(url)
    return url;
    // return `${HOST}/movie/${type}?api_key=${KEY}&language=ko-KR&page=${page}`
};
export const makeImageUrl = (size, file) => {
    // console.log(file)
    return `${IMAGE_HOST}/${size}${file}`
}