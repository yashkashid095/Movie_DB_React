import React, { useEffect, useState } from 'react';
import MovieList from '../components/MovieList/MovieList';

const HomePage = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?s=movie&apikey=2d9b146b&type=movie&page=${currentPage}`)
            .then((res) => res.json())
            .then((data) => {
                setPopularMovies(data.Search);
                setTotalPages(Math.ceil(data.totalResults / 10)); 
            });
    }, [currentPage]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="home-page">
            <h2>Popular Movies</h2>
            <MovieList movies={popularMovies} />
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default HomePage;
