# AI Failure Mode Report

## HW3: Resilient Event Hub & AI Failure Audit

This report documents three AI-induced defects identified during development and review.

---

## Defect 1: Countdown Drift Risk

### Defect Description

An initial AI-generated approach could implement the countdown by repeatedly decrementing a local counter, such as reducing the remaining seconds by one every second.

This approach can drift because JavaScript timers such as `setInterval()` are not guaranteed to execute at the exact requested time.

### Diagnostic Method

The implementation was reviewed by inspecting the countdown logic and comparing the displayed time with an absolute UTC deadline.

The review focused on whether the countdown was calculated from the current time or simply decremented on every timer callback.

### Refactored Solution

The final implementation uses an absolute UTC ISO 8601 deadline:

```javascript
const deadline = new Date("2026-12-31T23:59:59Z");
```

Remaining time is recalculated using:

```javascript
const remaining = deadline.getTime() - Date.now();
```

This avoids accumulating timer drift.

---

## Defect 2: Incomplete Form State Machine

### Defect Description

During review, the form interface existed in the HTML, but the JavaScript initially contained only the countdown logic.

As a result, the form status could remain at `Idle` and the required state transitions were not implemented.

### Diagnostic Method

The issue was detected by testing the form in the browser.

The expected transitions were:

```text
Idle → Submitting → Success
Idle → Submitting → Error
```

The browser test showed that the form did not perform these transitions until the state-machine logic was added.

### Refactored Solution

The final implementation defines explicit states:

```javascript
const FORM_STATE = {
  IDLE: "Idle",
  SUBMITTING: "Submitting",
  SUCCESS: "Success",
  ERROR: "Error"
};
```

The implementation uses:

```javascript
function setFormState(nextState) {
  currentState = nextState;
  formStatus.textContent = nextState;
  submitButton.disabled =
    nextState === FORM_STATE.SUBMITTING;
}
```

This makes state transitions explicit and easier to review.

---

## Defect 3: Unsafe User Input Rendering

### Defect Description

User-provided form input can become an XSS vulnerability if it is inserted into the page using unsafe HTML rendering such as `innerHTML`.

For example, the following payload was used during testing:

```text
<script>alert("XSS")</script>
```

### Diagnostic Method

The form was tested in the browser with the payload above.

The test verified whether the browser executed the injected script or displayed it as plain text.

### Refactored Solution

The final implementation sanitizes the input as text and limits its length:

```javascript
function sanitizeInput(value) {
  return value
    .trim()
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .slice(0, 100);
}
```

The final output is written using `textContent`:

```javascript
formStatus.textContent =
  `Success: Welcome, ${safeName}`;
```

Using `textContent` prevents the input from being interpreted as executable HTML.

---

## Verification Summary

The final HW3 implementation was reviewed using:

* Browser functional testing
* Form state testing
* XSS payload testing
* Git history inspection

The final implementation uses an absolute UTC deadline, an explicit form state machine, double-submit prevention, and safe text rendering.
