# 💰 Expense Manager Tracker Agent

A Node.js CLI-based AI Agent powered by **Groq API** to manage your **income** and **expenses** interactively.  
You can add income, log expenses, and get total expenses between dates — all in a conversational way.  

---

## 🚀 Features
- **AI-powered Conversations** — Talk to the agent naturally via CLI.
- **Add Income** — Save your monthly salary or earnings.
- **Add Expense** — Track your spending with name and amount.
- **Get Total Expenses** — Retrieve your spending summary between two dates.
- **Simple & Lightweight** — Runs in Node.js with no complex setup.

---

## 📂 Project Structure
```
.
├── agent.mjs        # Main agent logic
├── package.json     # Dependencies & scripts
├── .env             # Stores API key
└── README.md        # This file
```

---

## ⚙️ Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/expense-manager-agent.git
   cd expense-manager-agent
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Groq API key:
   ```env
   GROQ_API_KEY=your_api_key_here
   ```

---

## ▶️ Usage
Run the agent:
```bash
node agent.mjs
```

You can now chat with the agent in the terminal.

---

## 📝 Example Commands
**Add Income**
```
USER: My monthly income is 50000
```

**Add Expense**
```
USER: I spent 2000 on groceries
```

**Get Total Expenses**
```
USER: Show my total expenses from January to February
```

**Exit**
```
USER: bye
```

---

## 🛠 Example Session
```
USER: My monthly income is 40000
Assistant: Got it! Your income is now 40000 INR.

USER: I spent 2500 on rent
Assistant: Expense added.

USER: Show my total expenses from January to March
Assistant: 2500 INR

USER: bye
```

---

## 📜 License
MIT License — free to use and modify.
