

document.addEventListener('DOMContentLoaded', function() {
    const navHome = document.getElementById('nav-home');
    const navTvShows = document.getElementById('nav-tv-shows');
    const navMovies = document.getElementById('movie');
    const movieGrid = document.getElementById('movie-grid');
    const modal = document.getElementById('modal');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modal.appendChild(modalContent);

    navHome.addEventListener('click', function(event) {
        event.preventDefault();
        fetchAndDisplayData('home'); 
    });

    navTvShows.addEventListener('click', function(event) {
        event.preventDefault();
        fetchAndDisplayData('tvshows'); 
    });

    navMovies.addEventListener('click', function(event) {
        event.preventDefault();
        fetchAndDisplayData('Movies'); 
    });

  
    function fetchAndDisplayData(category) {
        fetch(movie.json)
            .then(response => response.json())
            .then(data => {
                renderMovies(data[category]);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    
    function renderMovies(movies) {
        movieGrid.innerHTML = '';

        movies.forEach(movie => {
            const movieElement = createMovieElement(movie);
            movieGrid.appendChild(movieElement);
        });
    }

    
    function createMovieElement(movie) {
        const { title, description, genre,  videoUrl } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
            <div class="movie-thumbnail">
                <img src="${thumbnail}" alt="${title}">
            </div>
            <div class="movie-info">
                <h2>${title}</h2>
                <p>${description}</p>
                <p><strong>Genre:</strong> ${genre}</p>
                <button class="btn-play" data-video="${videoUrl}">Play</button>
                <button class="btn-details" data-movie='${JSON.stringify(movie)}'>Details</button>
            </div>
        `;

        
        const playButton = movieElement.querySelector('.btn-play');
        playButton.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            
            window.open(videoUrl, '_blank');
        });

        
        const detailsButton = movieElement.querySelector('.btn-details');
        detailsButton.addEventListener('click', function() {
            const movieData = JSON.parse(this.getAttribute('data-movie'));
            showModal(movieData);
        });

        return movieElement;
    }

    
    function showModal(movie) {
        modalContent.innerHTML = `
            <span class="modal-close">&times;</span>
            <h2>${movie.title}</h2>
            <p><strong>Description:</strong> ${movie.description}</p>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <button class="btn-play-modal" data-video="${movie.videoUrl}">Play</button>
        `;

        modal.style.display = 'flex';

      
        const modalClose = modalContent.querySelector('.modal-close');
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
        });

        
        const playButtonModal = modalContent.querySelector('.btn-play-modal');
        playButtonModal.addEventListener('click', function() {
            const videoUrl = this.getAttribute('data-video');
            
            window.open(videoUrl, '_blank');
        });
    }

});
