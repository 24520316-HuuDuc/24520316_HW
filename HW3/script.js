// ==============================
// Slice 1: Drift-Free Countdown
// ==============================

const deadline = new Date("2026-12-31T23:59:59Z");

const countdownElement = document.querySelector("#countdown");

function updateCountdown() {
  const now = Date.now();
  const remaining = deadline.getTime() - now;

  if (remaining <= 0) {
    countdownElement.textContent = "Event started";
    return;
  }

  const totalSeconds = Math.floor(remaining / 1000);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownElement.textContent =
    `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

updateCountdown();
setInterval(updateCountdown, 250);


// ==============================
// Slice 2: Form State Machine
// ==============================

const form = document.querySelector("#event-form");
const nameInput = document.querySelector("#name");
const submitButton = document.querySelector("#submit-button");
const formStatus = document.querySelector("#form-status");

const FORM_STATE = {
  IDLE: "Idle",
  SUBMITTING: "Submitting",
  SUCCESS: "Success",
  ERROR: "Error"
};

let currentState = FORM_STATE.IDLE;

function setFormState(nextState) {
  currentState = nextState;

  formStatus.textContent = nextState;

  submitButton.disabled =
    nextState === FORM_STATE.SUBMITTING;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (currentState === FORM_STATE.SUBMITTING) {
    return;
  }

  setFormState(FORM_STATE.SUBMITTING);

  setTimeout(() => {
    if (nameInput.value.trim() === "") {
      setFormState(FORM_STATE.ERROR);
      return;
    }

    setFormState(FORM_STATE.SUCCESS);
  }, 1000);
});