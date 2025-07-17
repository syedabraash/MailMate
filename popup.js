document.getElementById("summarize-btn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;

    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        func: extractThreadFromGmail,
      },
      async (results) => {
        const thread = results[0].result;

        if (thread.length === 0) {
          document.getElementById("summary-box").innerText = "No thread found.";
          return;
        }

        const summary = await summarizeThread(thread);
        document.getElementById("summary-box").innerText = summary;
      }
    );
  });
});

function extractThreadFromGmail() {
  const possibleBodies = Array.from(document.querySelectorAll("div[dir='ltr']"));
  const thread = [];

  possibleBodies.forEach((div) => {
    const isVisible = div.offsetParent !== null;
    const isInThread = div.closest("div[role='listitem']");
    const text = div.innerText.trim();

    if (isVisible && isInThread && text.length > 20) {
      thread.push(text);
    }
  });

  return thread;
}


async function summarizeThread(thread) {
  const apiKey = "Your_API_Key";
  const prompt = "Summarize this email thread in clear bullet points:\n\n" + thread.join("\n\n");

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are an assistant that summarizes Gmail threads briefly and clearly.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 500,
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    console.log("🔍 OpenAI API Response:", data);

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else if (data.error) {
      return `❌ OpenAI Error: ${data.error.message}`;
    } else {
      return "❌ OpenAI API returned an empty or malformed response.";
    }
  } catch (error) {
    console.error("OpenAI API error:", error);
    return "⚠️ Failed to summarize due to an error.";
  }
}