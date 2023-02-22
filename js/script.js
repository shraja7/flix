const global = {
    currentPage : window.location.pathname,
}

const displayPopularMovies = async () => { 
    const {results} = await fetchAPIData('movie/popular');
    console.log(results);
 }

//fetch data from TMDB API
const fetchAPIData = async (endpoint) => {
    const API_KEY = '01e6aa79cdd7066d6cd557877ab7ac77'
    const API_URL = `https://api.themoviedb.org/3/`;

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    //get data
    const data = await response.json();
    return data
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
        console.log('Shows');
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