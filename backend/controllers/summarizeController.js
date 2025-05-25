import pool from '../db.js';
import fetch from 'node-fetch';

const OPENROUTER_API_KEY = process.env.API_KEY;
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

const summarizeTodos = async (req, res) => {
  try {
    const result = await pool.query('SELECT text FROM todos WHERE completed = false');
    const todos = result.rows.map(row => row.text).filter(Boolean);

    if (todos.length === 0) {
      return res.status(400).json({ error: 'No pending todos to summarize' });
    }

    const prompt = `
You are a productivity assistant. Read this list of *pending* tasks and provide a natural-language paragraph summary explaining what still needs to be done, their importance, and possible overall goal.

Pending Tasks:
${todos.map((t, i) => `${i + 1}. ${t}`).join('\n')}
`;

    const aiRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'mistralai/mistral-7b-instruct',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 250
      })
    });

    const aiData = await aiRes.json();
    const summary = aiData.choices?.[0]?.message?.content;

    if (!summary) throw new Error('Summary generation failed.');

    const slackRes = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: summary })
    });

    if (!slackRes.ok) throw new Error('Slack webhook failed.');

    res.json({ success: true, summary });

  } catch (err) {
    console.error('Summarize Error:', err);
    res.status(500).json({ error: err.message });
  }
};

export default summarizeTodos;
