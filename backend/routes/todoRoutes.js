import express from 'express';
import {
  getTodos,
  addTodo,
  deleteTodo,
  getPendingTodos,
  updateTodo
} from '../controllers/todoController.js';

const router = express.Router();

router.get('/', getTodos);
router.get('/pending', getPendingTodos); 
router.post('/', addTodo);
router.delete('/:id', deleteTodo);
router.put('/:id',updateTodo)

export default router;
