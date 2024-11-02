import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
            navigate(`/search/${searchQuery}`);
            setSearchQuery('');
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
            <div className="navbar-header">
                <h1 className="nav-logo">MovieDb</h1>
                <button className="menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? '✖' : '☰'}
                </button>
            </div>
            <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                <li><Link to="/" onClick={closeMenu}>Popular</Link></li>
                <li><Link to="/top-rated" onClick={closeMenu}>Top Rated</Link></li>
                <li><Link to="/upcoming" onClick={closeMenu}>Upcoming</Link></li>
            </ul>
            <form onSubmit={handleSearch} className={`search-form ${isMenuOpen ? 'open' : ''}`}>
                <input
                    type="text"
                    placeholder="Search Movies"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
        </nav>
    );
};

export default Navbar;
