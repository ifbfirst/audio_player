const player = document.querySelector(".audio_player");
const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");
const audio = document.querySelector(".audio");
const progressWrapper = document.querySelector(".progress_wrapper");
const progress = document.querySelector(".progress");
const bodyWrapper = document.querySelector(".body_wrapper");
const time = document.querySelector(".time");
const progressTime = document.querySelector(".progress_time");
const title = document.querySelector(".song");
const body = document.querySelectorAll("body");

//названия песен

const songs = ["New Generation", "Humanity", "Still Loving You"];

// песня по умолчанию
let songIndex = 0;


//Init

function loadSong(song) {
  title.innerHTML = song;
  audio.src = `audio/${song}.mp3`;
  player.style.backgroundImage = `url("img/${songIndex + 1}.jpg")`;
 //time.innerHTML =  `${getTimeCodeFromNum(num)}`;

}

loadSong(songs[songIndex]);

audio.addEventListener("loadedmetadata", setDurationTime);

function setDurationTime (e)
{const {duration}  = e.srcElement;
  time.innerHTML =  getTimeCodeFromNum(duration);


}

//play

function playSong() {
  player.classList.add("playing");
  audio.play();
  playBtn.style.backgroundImage = `url("svg/pause.png")`;
 
}

//pause

function pauseSong() {
  player.classList.remove("playing");
  audio.pause();
  playBtn.style.backgroundImage = `url("svg/play.png")`;
}

playBtn.addEventListener("click", () => {
  const isPlaying = player.classList.contains("playing");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// next song

function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

nextBtn.addEventListener("click", nextSong);

//previousSong

function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

previousBtn.addEventListener("click", prevSong);

//progress bar

function updateProgress (e){
const {duration, currentTime}  = e.srcElement;
const progressPercent = (currentTime / duration ) * 100;
progress.style.width = `${progressPercent}%`;
//time.innerHTML = getTimeCodeFromNum(audio.duration);
progressTime.innerHTML = getTimeCodeFromNum(audio.currentTime);
}

audio.addEventListener('timeupdate', updateProgress)

//set progress

function setProgress(e){
 const width = this.clientWidth;
 const clickX = e.offsetX;
 const duration = audio.duration;
 audio.currentTime = (clickX / width) * duration;
    
}

progressWrapper.addEventListener('click', setProgress)

//autoplay

audio.addEventListener('ended', nextSong)

//turn seconds into min and sec

function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

