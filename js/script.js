const global = {
    currentPage : window.location.pathname,
}

const displayPopularMovies = async () => { 
    const {results} = await fetchAPIData('movie/popular');
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        
        <a href="movie-details.html?id=${movie.id}">
         ${
            movie.poster_path ?
            ` <img
            src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />` : ` <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="Movie Title"
        />`
         }
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${movie.release_date}</small>
          </p>
        </div>
      
        
        `
        document.querySelector('#popular-movies').appendChild(div);
    });
 }

 //display popular tv shows
 const displayPopularShows = async () => { 
    const {results} = await fetchAPIData('tv/popular');
    results.forEach(show => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        
        <a href="tv-details.html?id=${show.id}">
         ${
            show.poster_path ?
            ` <img
            src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />` : ` <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}}"
        />`
         }
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">
            <small class="text-muted">Release: ${show.first_air_date}</small>
          </p>
        </div>
      
        
        `
        document.querySelector('#popular-shows').appendChild(div);
    });
 }

//fetch data from TMDB API
const fetchAPIData = async (endpoint) => {
    const API_KEY = '01e6aa79cdd7066d6cd557877ab7ac77'
    const API_URL = `https://api.themoviedb.org/3/`;

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    showSpinner();
    //get data
    const data = await response.json();
    hideSpinner();
    return data
}
//spinner
const showSpinner = () => { 
    document.querySelector('.spinner').classList.add('show');
 }

 const hideSpinner = () => { 
    document.querySelector('.spinner').classList.remove('show');
 }

//highlight active link
const highlightActiveLink = () => { 
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
 }

//initialize app
const init = () => { 

    highlightActiveLink();

    switch (global.currentPage) {
        case '/': 
        case '/index.html':
        displayPopularMovies();
        break;
        case '/shows.html':
        displayPopularShows();
        break;
        case '/movie-details.html':
        console.log('Movie Details');
        break;
        case '/tv-details.html':
        console.log('TV Details');
        break;
        case '/search.html':
        console.log('Search');
        break;
    }
 }



 document.addEventListener('DOMContentLoaded', init);