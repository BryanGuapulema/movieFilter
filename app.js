const searchInput = document.querySelector("#searchInput");
const moviesList = document.querySelector("#moviesList");
const favoritesList = document.querySelector("#favoritesList");

import { mockMovies } from './mock.js';

const movies = mockMovies.results

renderMovies()

function renderMovies(){

    if (movies.length === 0) {
        container.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
    }
    
    movies.forEach(movie => {
        const card = document.createElement("div");
        const p = document.createElement("p")

        card.classList.add("movie-card");
        p.textContent = movie.title
        card.appendChild(p)
        
        moviesList.appendChild(card)
    })
}

async function  getPopularMovies(){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzkxYjA2NGYxYTMxMDc1MGVlNjE3YWRhMTVjYTA4OCIsIm5iZiI6MTc1NTAzODE4My44NzMsInN1YiI6IjY4OWJjMWU3ZTIyYjEzMTZjNTVlM2ZlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tc6Wf2B8NPxDfDFHlp7kNXWmxVJXhy6A3Md0-irUsD0'
        }
    };

    return movies = await fetch('https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1', options).then(res => res.json())
}
