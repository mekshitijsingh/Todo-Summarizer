import React, { useState } from 'react';
import axios from 'axios';

const TodoList = ({ todos, onUpdate }) => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/todos/${id}`);
    onUpdate();
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  const handleEditSave = async () => {
    if (!editText.trim() || !editingId) return;
    await axios.put(`http://localhost:5000/todos/${editingId}`, { text: editText });
    setEditingId(null);
    setEditText('');
    onUpdate();
  };

  const handleToggleComplete = async (todo) => {
    await axios.put(`http://localhost:5000/todos/${todo.id}`, {
      text: todo.text,
      completed: !todo.completed
    });
    onUpdate();
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <ul style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {todos.map((todo) => (
        <li key={todo.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#374151', borderRadius: '0.375rem', padding: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo)}
              style={{ transform: 'scale(1.2)' }}
            />
            {editingId === todo.id ? (
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                style={{ flex: 1, padding: '0.5rem', borderRadius: '0.375rem', backgroundColor: '#4B5563', color: 'white', border: 'none' }}
              />
            ) : (
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text} {todo.completed && '✅'}
              </span>
            )}
          </div>
          {editingId === todo.id ? (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={handleEditSave} style={{ color: '#34D399', background: 'none', border: 'none' }}>💾</button>
              <button onClick={handleCancel} style={{ color: '#F87171', background: 'none', border: 'none' }}>✖</button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button onClick={() => startEdit(todo)} style={{ color: '#60A5FA', background: 'none', border: 'none' }}>✏️</button>
              <button onClick={() => handleDelete(todo.id)} style={{ color: '#F87171', background: 'none', border: 'none' }}>🗑️</button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
