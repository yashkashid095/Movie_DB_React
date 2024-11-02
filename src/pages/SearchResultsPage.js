import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieList from '../components/MovieList/MovieList';

const SearchResultsPage = () => {
    const { query } = useParams();
    const [searchedMovies, setSearchedMovies] = useState([]);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?s=${query}&apikey=2d9b146b&type=movie`)
            .then((res) => res.json())
            .then((data) => {
                setSearchedMovies(data.Search || []);
            });
    }, [query]);

    return (
        <div className="search-results-page">
            <h2>Search Results for "{query}"</h2>
            <MovieList movies={searchedMovies} />
        </div>
    );
};

export default SearchResultsPage;
