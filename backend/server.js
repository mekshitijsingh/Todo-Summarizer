import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js';
import todoRoutes from './routes/todoRoutes.js';
import summarizeController from './controllers/summarizeController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/todos', todoRoutes);
app.post('/summarize', summarizeController);

app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ status: 'DB connected', time: result.rows[0].now });
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
