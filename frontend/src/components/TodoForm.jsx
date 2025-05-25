import React, { useState } from 'react';
import axios from 'axios';

const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await axios.post('http://localhost:5000/todos', { text });
    setText('');
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        style={{ flex: 1, padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: '#374151', color: 'white', border: 'none' }}
      />
      <button type="submit" style={{ backgroundColor: '#6366F1', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.375rem', border: 'none' }}>Add</button>
    </form>
  );
};

export default TodoForm;