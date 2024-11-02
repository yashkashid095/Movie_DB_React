import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetail.css'; 

const MovieDetail = () => {
    const { id } = useParams(); 
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    useEffect(() => {
        
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=2d9b146b`)
            .then((res) => res.json())
            .then((data) => {
                if (data.Response === "True") {
                    setMovie(data);
                } else {
                    setError(data.Error);
                }
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>; 

    return (
        <div className="movie-detail">
            <h1 className="movie-title">{movie.Title}</h1>
            <div className="movie-content">
                <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
                <div className="movie-info">
                    <h2>Overview</h2>
                    <p className="movie-plot">{movie.Plot}</p>
                    <h3>Cast:</h3>
                    <ul className="cast-list">
                        {movie.Actors.split(', ').map((actor, index) => (
                            <li key={index}>{actor}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
