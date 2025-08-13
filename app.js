//importing mock for develop.
import { mockMovies } from './mock.js';

//elements declararion
const searchInput = document.querySelector("#searchInput");
const moviesList = document.querySelector("#moviesList");
const favoritesList = document.querySelector("#favoritesList");

//globalvariables
const LOCAL_STORAGE_KEY = "favorites"
const movies = mockMovies.results
let favoriteMovies = loadFavorites()


//entrypoint
renderMovies(movies, moviesList)
renderMovies(getFavoriteMoviesObjects(), favoritesList)

//events
searchInput.addEventListener("input",
    debounce((event)=>{
        const searchText = event.target.value.trim().toLowerCase()
        console.log(searchText)
        const filteredMovies = filterMovies(searchText)
        renderMovies(filteredMovies, moviesList)
    },500)
)

// ---UTILITIES FOR POPULAR MOVIES SEARCHING

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
    const poster = document.createElement("img");
    const title = document.createElement("p")
    const year = document.createElement("p")
    const rating = document.createElement("p")
    const favoriteButton = document.createElement("button")

    card.classList.add("movie-card");
    poster.src = `${ "https://image.tmdb.org/t/p/w500"+movie.poster_path}"`
    title.innerHTML = `<p><strong>${movie.title}</strong> </p>`
    year.innerHTML = `<p><strong>Año: </strong> ${movie.release_date.slice(0,4)}</p>`
    rating.innerHTML = `<p><strong>Rating: </strong> ${movie.vote_average}/10 ⭐</p>`
    favoriteButton.textContent = "❤"

    if (favoriteMovies.includes(movie.id)){
        favoriteButton.classList.add("favorite-btn")
    }else{
        favoriteButton.classList.add("normal-btn")
    }

    favoriteButton.addEventListener("click",()=>{
        toggleFavorite.apply(this, [favoriteButton, movie])
    })

    card.appendChild(poster)
    card.appendChild(title)
    card.appendChild(year)
    card.appendChild(rating)
    card.appendChild(favoriteButton)

    
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



// ---UTILITIES FOR FAVORITES MOVIES 

function saveFavorites(){
    try{
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(favoriteMovies))
    } catch (err) {
    console.error("No se pudo guardar en localStorage:", err)
    }
}

function loadFavorites(){
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)    
    
    if (!raw) return [];

    try {    
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? parsed : [];    
    } catch (err) {
        console.error("Formato inválido, limpiando key:", err)
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        return []
    }    
}

function getFavoriteMoviesObjects(){
    const  favoriteMoviesObjects = movies.filter(movie =>
            favoriteMovies.includes(movie.id)
    )         
    return favoriteMoviesObjects
}

function toggleFavorite(favoriteButton,movie){
    if (!favoriteButton.classList.contains("favorite-btn")){//si no es favorito
        favoriteButton.classList.replace("normal-btn","favorite-btn")
        favoriteMovies.push(movie.id)
    }else{
        favoriteButton.classList.replace("favorite-btn", "normal-btn")
        favoriteMovies = favoriteMovies.filter(m => m!==movie.id)
    }        

    saveFavorites()
    //loadFavorites()
    renderMovies(getFavoriteMoviesObjects(), favoritesList)
}
