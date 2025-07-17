# 📬 MailMate – Gmail Thread Summarizer with AI

MailMate is a lightweight Chrome extension that uses OpenAI’s GPT models to summarize Gmail threads in a single click. Designed for productivity lovers, MailMate helps you instantly understand long conversations without reading every message.

## 🚀 Features

- 🧠 Summarize email threads using GPT-3.5 or GPT-4
- 📬 Integrated directly into Gmail interface
- 🖱️ One-click summary from Chrome extension popup
- 💬 Bullet point summaries of long conversations
- 🌙 Clean dark UI for popup

## 🛠️ Installation

1. Clone or download this repo to your machine.
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer Mode** (top-right corner)
4. Click **Load Unpacked**
5. Select the `MailMate/` folder

## 🔐 API Setup

1. Get your OpenAI API key from https://platform.openai.com/account/api-keys
2. Open `popup.js`
3. Replace this line with your key:

```js
const apiKey = "sk-REPLACE_WITH_YOUR_KEY";
````

> **Note**: For security, move the API call to a backend or secure environment before publishing or sharing.

## 📁 File Structure

```
MailMate/
├── manifest.json         # Chrome extension config
├── background.js         # (Optional) Event-based background logic
├── content.js            # Injected into Gmail pages
├── popup.html            # Extension popup UI
├── popup.js              # Popup logic (OpenAI call, extraction)
├── styles.css            # Dark theme styles
└── icons/                # Icons for extension
```

## 🧠 Powered By

* [OpenAI GPT-3.5 / GPT-4](https://platform.openai.com/)
* Chrome Extensions API

## 📌 Disclaimer

This is a personal productivity tool built for demo/portfolio purposes. Please do not hard-code sensitive keys in production. MailMate is not affiliated with Google or Gmail.

## 📄 License

MIT License
