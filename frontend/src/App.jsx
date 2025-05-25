import React, { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import SummarizeButton from './components/SummarizeButton';
import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const res = await axios.get(`${BASE_URL}/todos`);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ backgroundColor: '#111827', minHeight: '100vh', color: 'white', padding: '1.5rem' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto', backgroundColor: '#1F2937', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '1rem', padding: '1.5rem' }}>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1.5rem' }}>📝 Todo Summary Assistant</h1>
        <TodoForm onAdd={fetchTodos} />
        <TodoList todos={todos} onUpdate={fetchTodos} />
        <SummarizeButton />
      </div>
    </div>
  );
};

export default App;
