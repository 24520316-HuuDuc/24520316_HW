// ==============================
// Slice 2 + Slice 3: Form
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

  const isSubmitting = nextState === FORM_STATE.SUBMITTING;

  submitButton.disabled = isSubmitting;
  submitButton.textContent = isSubmitting
    ? "Submitting..."
    : "Submit";
}

function sanitizeInput(value) {
  return value
    .trim()
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .slice(0, 100);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Double-submit prevention
  if (currentState === FORM_STATE.SUBMITTING) {
    return;
  }

  const safeName = sanitizeInput(nameInput.value);

  setFormState(FORM_STATE.SUBMITTING);

  setTimeout(() => {
    if (safeName.length === 0) {
      setFormState(FORM_STATE.ERROR);
      return;
    }

    setFormState(FORM_STATE.SUCCESS);

    // textContent prevents user input from being interpreted as HTML.
    formStatus.textContent = `Success: Welcome, ${safeName}`;
  }, 1000);
});