const AudioContextClass =
  window.AudioContext || window.webkitAudioContext;

const audioContext = new AudioContextClass();

const frequencies = {
  kick: 100,
  snare: 220,
  hihat: 500,
  tom: 150
};

const beatRecorder = [];

function recordBeat(soundName) {
  beatRecorder.push({
    sound: soundName,
    timestamp: Date.now()
  });
}

function playSound(soundName) {
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const frequency = frequencies[soundName];

  if (!frequency) {
    return;
  }

  recordBeat(soundName);

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(
    frequency,
    audioContext.currentTime
  );

  gain.gain.setValueAtTime(
    0.5,
    audioContext.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.3
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.3);
}

document.querySelectorAll(".drum-pad").forEach((pad) => {
  pad.addEventListener("click", () => {
    playSound(pad.dataset.sound);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.repeat) {
    return;
  }

  const key = event.key.toLowerCase();

  const pad = document.querySelector(
    `.drum-pad[data-key="${key}"]`
  );

  if (!pad) {
    return;
  }

  playSound(pad.dataset.sound);
});