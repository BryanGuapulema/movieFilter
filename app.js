const searchInput = document.querySelector("#searchInput");
const moviesList = document.querySelector("#moviesList");
const favoritesList = document.querySelector("#favoritesList");

import { mockMovies } from './mock.js';

const movies = mockMovies.results
const favoriteMovies = []

renderMovies(movies, moviesList)
renderMovies(favoriteMovies, favoritesList)

searchInput.addEventListener("input",
    debounce((event)=>{
        const searchText = event.target.value.trim().toLowerCase()
        console.log(searchText)
        const filteredMovies = filterMovies(searchText)
        renderMovies(filteredMovies, moviesList)
    },500)
)

function debounce(fn, delay) {
  let timeoutId
  return function (...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  };
}

function renderMovies(movies,container){
    container.innerHTML = ""

    if (movies.length === 0) {
        container.innerHTML = "<p>No se encontraron resultados.</p>";
        return;
    }
    
    movies.forEach(movie => renderSingleMovie(movie, container))
}

function renderSingleMovie(movie,container){
    const card = document.createElement("div");
    const title = document.createElement("p")
    const year = document.createElement("p")
    const rating = document.createElement("p")

    card.classList.add("movie-card");
    title.innerHTML = `<p><strong>Titulo:</strong> ${movie.title}</p>`
    year.innerHTML = `<p><strong>Año: </strong> ${movie.release_date.slice(0,4)}</p>`
    rating.innerHTML = `<p><strong>Rating: </strong> ${movie.vote_average}/10 ⭐</p>`

    card.appendChild(title)
    card.appendChild(year,)
    card.appendChild(rating)

    
    container.appendChild(card)
}

function filterMovies(searchText){
    if(!searchText) return movies

    return movies.filter(movie => movie.title.toLowerCase().includes(searchText))
}

// async function  getPopularMovies(){
//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NzkxYjA2NGYxYTMxMDc1MGVlNjE3YWRhMTVjYTA4OCIsIm5iZiI6MTc1NTAzODE4My44NzMsInN1YiI6IjY4OWJjMWU3ZTIyYjEzMTZjNTVlM2ZlMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tc6Wf2B8NPxDfDFHlp7kNXWmxVJXhy6A3Md0-irUsD0'
//         }
//     };

//     return movies = await fetch('https://api.themoviedb.org/3/movie/popular?language=es-ES&page=1', options).then(res => res.json())
// }
