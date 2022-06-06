import React, { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { addTodo, updateTodo, deleteTodo, getTodos } from "../../api/todosApi";
import { IoTrashSharp } from 'react-icons/io';
import { BiCloudUpload, BiTrash } from 'react-icons/bi';
import styled from 'styled-components';

const TodoList = () => {
  const [newTodo, setNewTodo] = useState('');
  const queryClient = useQueryClient();
  const inputRef = useRef(null);

  const { isLoading, isError, error, data: todos } = useQuery('todos', getTodos, {
    select: data => data.sort((a, b) => b.id - a.id)
  });

  const addTodoMutation = useMutation(addTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    }
  })

  const updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    }
  })
  
  const deleteTodoMutation = useMutation(deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos');
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false });
    setNewTodo('');
  }

  const newItemSection = (
    <Form onSubmit={handleSubmit}>
      {/* <label htmlFor='new-todo'>Enter a new Todo item</label> */}
      <div className='new-todo'>
        <input 
          type='text' 
          id='new-todo'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Enter new Todo'
          ref={inputRef}
        />
      </div>
      <button className='submit' >
        <BiCloudUpload size={30} />
      </button>
    </Form>
  )

  let content;
  if(isLoading) {
    content = <p>Loading...</p>
  } else if(isError) {
    content = <p>{error.message}</p>
  } else {
    content = todos.map(todo => {
      return (
        <Article key={todo.id}>
          <div className='todo'>
            <input 
              type='checkbox' 
              checked={todo.completed}
              id={todo.id}
              onChange={() => updateTodoMutation.mutate({ ...todo, completed: !todo.completed })}
            />
            <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button className='trash' onClick={() => deleteTodoMutation.mutate({ id: todo.id })}>
            <BiTrash size={30}/>
          </button>
        </Article>
      )
    })
  }

  return (
    <Container>
      <h1>
        TodoList
      </h1>
      {newItemSection}
      {content}
    </Container>
  )
}

export default TodoList;

const Container = styled.main`
  background-color: #fff;
  border-radius: 5px;
  width: 70vw;
  height: 70vh;
  margin: 10vh auto;
  text-align: center;
  /* position: relative; */
  display: flex;
  flex-direction: column;
  align-items: center;
  
  h1 {
    margin: 1rem;
    align-self: flex-start;
  }
`

const Form = styled.form`
  /* position: absolute; */
  background-color: #fff;
  border: 2px solid #ddd;
  width: 70%;
  display: flex;
  justify-content: space-between;
  padding: .5rem 1rem;

  input {
    border: none;
    border-radius: 2px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .3);
    padding: .5rem;

    ::placeholder {
      color: red;
      font-size: 1rem;
    }
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    border-radius: 2px;

  }
`

const Article = styled.article`
  border: 2px solid #ddd;
  width: 70%;
  margin: .5rem;
  display: flex;
  justify-content: space-between;
  padding: .3rem .5rem;

  input {
    outline: none;
    margin-top: .6rem;
    margin-right: 1rem;
  }

  label {
    /* display: none; */
    /* margin-bottom: .2rem; */
    font-size: 1.4rem;
    font-weight: bold;
  }


  button {
    border: none;
    cursor: pointer;
    background-color: transparent;
  }
`