import { useState, useEffect, useCallback } from 'react';
import { Todo, createTodo, getTodos, updateTodo, deleteTodo, toggleTodoComplete } from './todoService';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const loadTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load todos');
    } finally {
      setLoading(false);
    }
  }, []);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  const addTodo = useCallback(async (text: string) => {
    try {
      setIsAdding(true);
      setError(null);
      const newTodo = await createTodo(text);
      setTodos(prev => [newTodo, ...prev]);
      return newTodo;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo');
      throw err;
    } finally {
      setIsAdding(false);
    }
  }, []);

  const updateTodoText = useCallback(async (id: string, text: string) => {
    try {
      setIsUpdating(id);
      setError(null);
      await updateTodo(id, { text });
      setTodos(prev => prev.map(todo => 
        todo.id === id ? { ...todo, text, updatedAt: new Date() } : todo
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      throw err;
    } finally {
      setIsUpdating(null);
    }
  }, []);

  const toggleComplete = useCallback(async (id: string) => {
    try {
      setIsUpdating(id);
      setError(null);
      const todo = todos.find(t => t.id === id);
      if (!todo) return;
      
      await toggleTodoComplete(id, !todo.completed);
      setTodos(prev => prev.map(t => 
        t.id === id ? { ...t, completed: !t.completed, updatedAt: new Date() } : t
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to toggle todo');
      throw err;
    } finally {
      setIsUpdating(null);
    }
  }, [todos]);

  const removeTodo = useCallback(async (id: string) => {
    try {
      setIsDeleting(id);
      setError(null);
      await deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      throw err;
    } finally {
      setIsDeleting(null);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    todos,
    loading,
    error,
    isAdding,
    isUpdating,
    isDeleting,
    addTodo,
    updateTodoText,
    toggleComplete,
    removeTodo,
    loadTodos,
    clearError,
  };
}; 