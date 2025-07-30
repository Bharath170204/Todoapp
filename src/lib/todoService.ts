import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './firebase';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Create a new todo
export const createTodo = async (text: string): Promise<Todo> => {
  try {
    const docRef = await addDoc(collection(db, 'todos'), {
      text,
      completed: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const newTodo: Todo = {
      id: docRef.id,
      text,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return newTodo;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw new Error('Failed to create todo');
  }
};

// Get all todos
export const getTodos = async (): Promise<Todo[]> => {
  try {
    const q = query(collection(db, 'todos'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const todos: Todo[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      todos.push({
        id: doc.id,
        text: data.text,
        completed: data.completed,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      });
    });

    return todos;
  } catch (error) {
    console.error('Error getting todos:', error);
    throw new Error('Failed to fetch todos');
  }
};

// Update a todo
export const updateTodo = async (id: string, updates: Partial<Todo>): Promise<void> => {
  try {
    const todoRef = doc(db, 'todos', id);
    await updateDoc(todoRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    throw new Error('Failed to update todo');
  }
};

// Delete a todo
export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const todoRef = doc(db, 'todos', id);
    await deleteDoc(todoRef);
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw new Error('Failed to delete todo');
  }
};

// Toggle todo completion status
export const toggleTodoComplete = async (id: string, completed: boolean): Promise<void> => {
  try {
    await updateTodo(id, { completed });
  } catch (error) {
    console.error('Error toggling todo completion:', error);
    throw new Error('Failed to toggle todo completion');
  }
}; 