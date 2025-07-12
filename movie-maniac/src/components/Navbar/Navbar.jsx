import React from 'react'

import "./Navbar.css";
import SearchBar from './SearchBar';
import Fire from "../../assets/fire.png"
import Star from "../../assets/glowing-star.png"
import party from "../../assets/partying-face.png"
const Navbar = () => {
  const handleSearch = (query) => {
    console.log('Search for:', query);
    // Optional: Navigate or filter movies
  };
  return (
    <nav className='navbar'>
        <h1>MovieManiac</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="navbar_links">
            <a href="#popular">
                Popular{" "}
                <img src={Fire} alt="fire emoji" className="navbar_emoji"/></a>
            <a href="#top_rated">
                Top Rated{" "}
                <img src={Star} alt="star emoji" className="navbar_emoji"/></a>
            <a href="#upcoming">
                Upcoming{" "}
                <img src={party} alt="party face emoji" className="navbar_emoji"/></a>
        </div>
    </nav>
  )
}

export default Navbar