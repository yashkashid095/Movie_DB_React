import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css'; 

const MovieList = ({ movies }) => {
    return (
        <div className="movie-list">
            {movies && movies.length > 0 ? (
                movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
            ) : (
                <p>No movies found.</p>
            )}
        </div>
    );
};

export default MovieList;
