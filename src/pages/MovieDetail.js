import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
    const { id } = useParams(); 
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 
    const [castImages, setCastImages] = useState([]); 

    useEffect(() => {
    
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=2d9b146b`)
            .then((res) => res.json())
            .then((data) => {
                if (data.Response === "True") {
                    setMovie(data);
                    fetchCastImages(data.Actors.split(', ')); 
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

    const fetchCastImages = (cast) => {
        const fetchImages = cast.map(actor => 
          
            fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(actor)}&apikey=2d9b146b`)
                .then(res => res.json())
                .then(data => ({
                    name: actor,
                    image: data.Poster || 'https://via.placeholder.com/150' 
                }))
                .catch(() => ({
                    name: actor,
                    image: 'https://via.placeholder.com/150' 
                }))
        );

        Promise.all(fetchImages).then(images => {
            setCastImages(images);
        });
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>; 

    return (
        <div className="movie-detail">
            <h1>{movie.Title}</h1>
            <img src={movie.Poster} alt={movie.Title} />
            <p>{movie.Plot}</p>
            <h3>Cast:</h3>
            <div className="cast-list">
                {castImages.map((actor, index) => (
                    <div key={index} className="actor-card">
                        <img src={actor.image} alt={actor.name} />
                        <p>{actor.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MovieDetail;
