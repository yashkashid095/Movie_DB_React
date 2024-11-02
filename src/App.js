import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import TopRatedPage from './pages/TopRatedPage';
import UpcomingPage from './pages/UpcomingPage';
import SearchResultsPage from './pages/SearchResultsPage';
import MovieDetail from './components/MovieDetail/MovieDetail';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/top-rated" element={<TopRatedPage />} />
                <Route path="/upcoming" element={<UpcomingPage />} />
                <Route path="/search/:query" element={<SearchResultsPage />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
