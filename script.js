const audioContext = new AudioContext();

const frequencies = {
  kick: 80,
  snare: 180,
  hihat: 400,
  tom: 120
};

function playSound(soundName) {
  const frequency = frequencies[soundName];

  if (!frequency) {
    return;
  }

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";

  gain.gain.setValueAtTime(0.3, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.2
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.2);
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
if (event.repeat) {
  return;
}