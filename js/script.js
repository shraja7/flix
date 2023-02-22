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

 //display movie details
 const displayMovieDetails = async () => { 
    //get id and split to get the id
    const movieID = window.location.search.split('=')[1];

    const movie = await fetchAPIData(`movie/${movieID}`);
    const div = document.createElement('div');
    div.innerHTML = `<div class="details-top">
    <div>
    ${
        movie.poster_path ?
        ` <img
        src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />` : ` <img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}"
    />`
     }
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
        ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${
            movie.genres.map(genre => {
                return `<li class="list-group-item">${genre.name}</li>`
            }).join('')
        }
      </ul>
      <a href="#" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $1,000,000</li>
      <li><span class="text-secondary">Revenue:</span> $2,000,000</li>
      <li><span class="text-secondary">Runtime:</span> 90 minutes</li>
      <li><span class="text-secondary">Status:</span> Released</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">Company 1, Company 2, Company 3</div>
  </div>`
  document.querySelector('#movie-details').appendChild(div);
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
        displayMovieDetails();
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