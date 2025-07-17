function insertSummarizeButton() {
  const threadContainer = document.querySelector("div[role='main']");

  if (!threadContainer || document.getElementById("mailmate-summarize-btn")) return;

  const button = document.createElement("button");
  button.innerText = "🧠 Summarize";
  button.id = "mailmate-summarize-btn";
  button.style.cssText = `
    margin: 12px;
    padding: 8px 16px;
    background: #1a73e8;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  `;

  button.addEventListener("click", () => {
    const emails = extractEmailThread();
    console.log("Thread extracted:", emails);
    alert("Emails extracted!\n" + emails.join("\n\n"));
  });

  threadContainer.prepend(button);
}

function extractEmailThread() {
  const emailBodies = document.querySelectorAll("div[role='listitem'] div[dir='ltr']");
  const thread = [];

  emailBodies.forEach((el) => {
    const text = el.innerText.trim();
    if (text.length > 0) {
      thread.push(text);
    }
  });

  return thread;
}

const observer = new MutationObserver(() => {
  insertSummarizeButton();
});
observer.observe(document.body, { childList: true, subtree: true });

insertSummarizeButton(); // Initial try
