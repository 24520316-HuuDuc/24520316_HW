const skipLink = document.createElement("a");

skipLink.href = "#home";
skipLink.textContent = "Skip to main content";
skipLink.className = "skip-link";

document.body.prepend(skipLink);