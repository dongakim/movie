import React, { useContext, useRef } from "react";
import "./Header.css"

import { MovieContext } from "../../stores/MovieStore.js";
import * as movieActions from "../../stores/actions/movieActions";

const Header = () => {
    const { dispatchMovie } = useContext(MovieContext)
    const inputEl = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(inputEl.current.value);
        if (inputEl.current.value.trim() === '') return;
        dispatchMovie(
            movieActions.fetchSearchMovie(inputEl.current.value)(dispatchMovie));
        inputEl.current.value = '';
    }

    return (<header className="header">
        {/* <div className="header-inner"> */}
        <form onSubmit={onSubmit}>
            <input className="header-movie-search-input" ref={inputEl} placeholder="영화를 검색해보세요." />
        </form>
        {/* </div> */}
    </header>)
}

export default Header;