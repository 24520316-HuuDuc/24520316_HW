# Task Decomposition

## HW3: Resilient Event Hub & AI Failure Audit

### Slice 1 - Drift-Free Countdown Engine
- Use UTC ISO 8601 timestamps.
- Calculate remaining time from an absolute deadline.
- Avoid decrementing the displayed time independently.

### Slice 2 - State-Machine Form
- Implement Idle state.
- Implement Submitting state.
- Implement Success state.
- Implement Error state.
- Keep form transitions explicit.

### Slice 3 - Double-Submit Prevention
- Disable repeated submission while submitting.
- Allow submission again after Success or Error.

### Slice 3 - Input Sanitization
- Treat user input as text.
- Do not inject raw user input with innerHTML.
- Prevent XSS payloads from becoming executable HTML.

### AI Failure Audit
- Identify 3 AI-induced defects.
- Record how each defect was diagnosed.
- Record and verify the refactored solution.

### Git Rules
- Use atomic commits.
- Minimum 5 commits.
- Explain every commit during live defense.