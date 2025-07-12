import React, { useEffect, useState } from 'react'

import "./Movielist.css";
import MovieCard from './MovieCard';

const Movielist = ({type, title, emoji}) => {
    const [movies, setMovies] = useState([]);
    const [filterMovies, setFilterMovies] = useState([])
    const [minRating, setMinRating] = useState(0)
    const [sort, setSort] = useState({
        by:"default",
        order:"asc"
    })
    useEffect(()=>{
        fetchMovies();
    },[])

    const fetchMovies= async ()=>{
        const response = await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=d76dfe8078cd6dad5c45ecad14a75cc6`);
        const data = await response.json();
        setMovies(data.results);
        setFilterMovies(data.results);
    };

    const handleFilter=rate=>{
        if(rate === minRating){
            setMinRating(0);
            setFilterMovies(movies);
        }else{
            setMinRating(rate);
            const filtered = movies.filter(movie=>movie.vote_average>=rate);
            setFilterMovies(filtered);
        }    
    }
 
    const handleSort = (e) => {
        const {name, value} = e.target;
        setSort((prev) => ({ ...prev, [name]: value}));
    };
    console.log(sort);

  return (
    <section className="movie_list" id={type}>
        <header className='align_center movie_list_header'>
            <h2 className='align_center movie_list_heading'>{title}{" "}
                <img src={emoji} alt ={`${emoji} icon`}className='navbar_emoji'/></h2>

            <div className='align_center movie_list_fs'>
                <ul className="align_center movie_filter">

                    <li className={minRating === 8? 'movie_filter_item active':'movie_filter_item'}
                    onClick={()=>handleFilter(8)}>8+ Star</li>

                    <li className={minRating === 7? 'movie_filter_item active':'movie_filter_item'} onClick={()=>handleFilter(7)}>7+ Star</li>

                    <li className={minRating === 6? 'movie_filter_item active':'movie_filter_item'} onClick={()=>handleFilter(6)}>6+ Star</li>
                    
                </ul>

                <select name="by" id="" onChange={handleSort} value={sort.by} className="movie_sorting">
                    <option value="default">SortBy</option>
                    <option value="release_date">Date</option>
                    <option value="vote_average">Rating</option>
                </select>
                <select name="order" id="" onChange={handleSort} value={sort.order} className="movie_sorting">
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>

            </div>
        </header>

        <div className="movie_cards">
            {filterMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
    </section>
  )
}

export default Movielist