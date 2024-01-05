import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);
  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };
  const handleEditTodo = () => {
    if (editIndex !== null && editTodo.trim() !== '') {
      const updatedTodos = [...todos];
      updatedTodos[editIndex] = editTodo;
      setTodos(updatedTodos);
      setEditIndex(null);
      setEditTodo('');
    }
  };
  const handleDeleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  return (
    <div className="d-flex align-items-center justify-content-center bg-dark" style={{ height: '100vh' }}>
      <Card className='shadow rounded bg-secondary' style={{ width: '25rem' }}>
        <Card.Body>
          <h4 style={{ textAlign: 'center', fontWeight: 'bold' }}>TODO-LIST</h4>
          <div className="d-flex">
            <input
              type="text"
              placeholder='Enter a Todo..'
              className="form-control"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              style={{ marginRight: '10px' }}
            />
            <div style={{ display: 'flex' }}>
              <Button className='bg-dark' onClick={handleAddTodo} style={{ marginRight: '5px', border: 'none', outline: 'none' }}>Add</Button>
            </div>
          </div>
          {todos.map((todo, index) => (
            <div key={index} className="d-flex mt-3">
              <input
                type="text"
                className="form-control"
                value={index === editIndex ? editTodo : todo}
                onChange={(e) => index === editIndex ? setEditTodo(e.target.value) : null}
                style={{ marginRight: '10px' }}
              />
              <div style={{ display: 'flex' }}>
                <Button className='bg-dark' onClick={() => setEditIndex(index)} style={{ marginRight: '5px', border: 'none', outline: 'none' }}><i class="fa-solid fa-pen-to-square"></i></Button>
                <Button className='bg-dark' onClick={() => handleDeleteTodo(index)} style={{ border: 'none', outline: 'none' }}><i class="fa-solid fa-trash"></i></Button>
              </div>
            </div>
          ))}
          {editIndex !== null && (
            <div className="d-flex mt-3">
              <Button className='bg-dark' onClick={handleEditTodo} style={{ marginRight: '5px', border: 'none', outline: 'none' }}>Save</Button>
              <Button className='bg-dark' onClick={() => setEditIndex(null)} style={{ border: 'none', outline: 'none' }}>Cancel</Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};
export default App;
