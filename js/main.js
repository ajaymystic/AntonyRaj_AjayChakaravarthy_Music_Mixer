const audioElements = document.querySelectorAll('.audio-player');
const playButton = document.querySelector('#playButton');
const pauseButton = document.querySelector('#pauseButton');
const refreshButton = document.querySelector('#refreshButton');
const volumeSlider = document.querySelector('#slider');
const labels = document.querySelectorAll('.label');
const targetZones = document.querySelectorAll('.target-zone');

function loadAudio(trackRef) {
  const audio = document.querySelector(`audio[data-trackref="${trackRef}"]`);
  if (audio) {
    audio.volume = volumeSlider.value / 100;
    audio.src = `audio/${trackRef}.mp3`;
    audio.play();
  }
}

function playAudio() {
  document.querySelectorAll('.target-zone .label').forEach(label => {
    const trackRef = label.getAttribute('data-trackref');
    loadAudio(trackRef);
  });
}

function pauseAudio() {
  audioElements.forEach(audio => audio.pause());
}

function setVolume() {
  audioElements.forEach(audio => {
    audio.volume = volumeSlider.value / 100;
  });
}

function resetGame() {
  audioElements.forEach(audio => {
    audio.pause();
    audio.currentTime = 0;
  });

  labels.forEach(label => {
    document.querySelector('.instruments').appendChild(label);
  });
}

function handleStartDrag(e) {
  const trackRef = e.target.closest('.label').getAttribute('data-trackref');
  e.dataTransfer.setData('text/plain', trackRef);
}

function handleDrop(e) {
  e.preventDefault();
  const trackRef = e.dataTransfer.getData('text/plain');
  const draggedLabel = document.querySelector(`.label[data-trackref="${trackRef}"]`);

  if (e.target.classList.contains('target-zone') && e.target.children.length === 0) {
    e.target.appendChild(draggedLabel);
    loadAudio(trackRef);
  }
}

labels.forEach(label => {
  label.addEventListener('dragstart', handleStartDrag);
});

targetZones.forEach(zone => {
  zone.addEventListener('dragover', e => e.preventDefault());
  zone.addEventListener('drop', handleDrop);
});

playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
refreshButton.addEventListener('click', resetGame);
volumeSlider.addEventListener('input', setVolume);
