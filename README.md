
# 📝 Todo Summary Assistant

A full-stack productivity app to manage todos, summarize pending tasks using AI (Mistral via OpenRouter), and post updates to Slack.

---

## 🔧 Tech Stack

- **Frontend**: React (with inline dark theme styles)
- **Backend**: Express.js + PostgreSQL
- **AI API**: Mistral via [OpenRouter](https://openrouter.ai)
- **Notifications**: Slack Incoming Webhook

---

## 🚀 Features

- Add, edit, delete todo items
- Mark todos as completed ✅
- Generate smart summary of *pending* todos
- Auto-send the summary to a Slack channel

---

## 📦 Backend Setup

### 1. Clone the Repository

```bash
git clone https://github.com/mekshitijsingh/Todo-Summarizer.git
cd todo-summary-assistant/backend
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
DATABASE_URL=your_postgres_connection_string
OPENROUTER_API_KEY=your_openrouter_api_key
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url
```

### 4. PostgreSQL Schema

Run this SQL to create the `todos` table:

```sql
CREATE TABLE IF NOT EXISTS todos (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE
);
```

### 5. Start the Backend

```bash
npm run dev
```

Server will run at: [http://localhost:5000](http://localhost:5000)

---

## 🌐 Frontend Setup

### 1. Navigate to Frontend Folder

```bash
cd ../todo-summary-ui
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Frontend

```bash
npm run dev
```

Open in browser: [http://localhost:5173](http://localhost:5173)

