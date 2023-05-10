
// Progress bar

const creditBtn = document.getElementById('cc-by-container')
const creditContainer = document.getElementById('credit-container')
const songName = document.getElementById('song-name')
const artistName = document.getElementById('artist-link')
const ccLicense = document.getElementById('cc-link')
const musicContainer = document.getElementById('music-container')
const image = document.getElementById('image');
const title = document.getElementById('title');
const album = document.getElementById('album');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const songCurrentTime = document.getElementById('current-time');
const songDuration = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');



// Giving appropriate credit
let isCCByOpen = false;


const displayCreditContainer = () => {
    isCCByOpen = true;
    creditContainer.classList.replace('credit-container-closed', 'credit-container-open')
    musicContainer.classList.replace('music-container-with-cc-closed', 'music-container-with-cc-open')
}

const hideCreditContainer = () => {
    isCCByOpen = false;
    creditContainer.classList.replace('credit-container-open', 'credit-container-closed')
    musicContainer.classList.replace('music-container-with-cc-open', 'music-container-with-cc-closed')
}



// credit event listeners
creditBtn.addEventListener('click', () => (isCCByOpen ? hideCreditContainer() : displayCreditContainer()));

// Music
const songs = [
    {
        credit: 'Canon in D Major by Kevin MacLeod is licensed under a Creative Commons Attribution License.',
        artistLink: 'https://freemusicarchive.org/music/Kevin_MacLeod/',
        ccLicense: 'Creative Commons Attribution License',
        ccLicenseLink: 'https://creativecommons.org/licenses/by/3.0/',
        name: 'canon-in-D-major',
        displayName:'Canon in D major',
        album: 'Album: Classical Sampler',
        artist: 'Kevin MacLead'
    },
    {
        credit:'If by Peter Rudenko is licensed under a Creative Commons Attribution License.',
        artistLink: 'https://freemusicarchive.org/music/Peter_Rudenko/',
        ccLicense: 'Creative Commons Attribution License',
        ccLicenseLink: 'https://creativecommons.org/licenses/by/3.0/',
        name: 'if',
        displayName:'If',
        album: 'Album: 15 Etudes',
        artist: 'Peter Rudenko'
    },
    {
        credit: 'J. S. Bach: Prelude in C - BWV 846 by Kevin MacLeod is licensed under a Creative Commons Attribution License.',
        artistLink: 'https://freemusicarchive.org/music/Kevin_MacLeod/',
        ccLicense: 'Creative Commons Attribution License',
        ccLicenseLink: 'https://creativecommons.org/licenses/by/3.0/',
        name: 'prelude-in-C-BWV-846',
        displayName:'J. S. Bach: Prelude in C - BWV 846',
        album: 'Album: Classical Sampler',
        artist: 'Kevin MacLead'
    }
]
// check if audio is playing
let isPlaying = false;

const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace('fa-circle-play', 'fa-circle-pause')
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace('fa-circle-pause', 'fa-circle-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// play/pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
const loadSong = (song) => {

    // // Check length of song title to determine styling
    titleLength = song.displayName.length;
    if (titleLength > 20) {
        title.classList.add('long-title')
    } else {
        title.classList.remove('long-title')
    }

    songName.textContent = song.displayName;
    artistName.textContent = song.artist;
    artistName.setAttribute('href', `${song.artistLink}`)
    ccLicense.textContent = song.ccLicense;
    ccLicense.setAttribute('href', `${song.ccLicenseLink}`)
    songName.textContent = song.displayName;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    album.textContent = song.album;
    music.src = `music/${song.name}.mp3`;
    image.src = `images/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Previous Song
const prevSong = () => {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex]);
    playSong()
}

// Next Song
const nextSong = () => {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex]);
    playSong()
}
// On load, select first song
loadSong(songs[songIndex])

// Update progress bar & time
const updateProgressBar = (e) => {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;

        // update progress bar width
        const progressPercentage = (currentTime / duration) * 100;
        progress.style.width = `${progressPercentage}%`;

        // displaying song duration 
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60)
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }

        // delay setting song duration element to avoid NaN error
        if (durationSeconds) {
            songDuration.textContent = `${durationMinutes}:${durationSeconds}`
        }

        // displaying song current time 
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60)
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }

        // delay setting current element to avoid NaN error
        if (durationSeconds) {
            songCurrentTime.textContent = `${currentMinutes}:${currentSeconds}`
        }
    }
}

// set progress bar
const setProgressBar = (e) => {
    const clickedPoint = e.offsetX;
    const width = progressContainer.clientWidth;
    const { duration } = music;
    const currentTimeOnBar = (clickedPoint / width) * duration;
    music.currentTime = currentTimeOnBar
}

// Other event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended',nextSong);
progressContainer.addEventListener('click', setProgressBar)