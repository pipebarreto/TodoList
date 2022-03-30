import React from 'react';
import App from '../App';

export default function Todolist(props){   
  
 /* const deleteTodo = (row) => {
    setTodos(todos.filter((todo, index) => index!== row));
  }*/

    return(
        <div>
             <table>
      <tr>
        <th>Date</th>
        <th>Description</th></tr>
        <tbody>          
          {
            props.todos.map((todo, index) => <tr key ={index}>
              <td>{todo.date}</td>
              <td>{todo.description}</td>
              <td><button onClick ={() => props.deleteTodo(index)}>Delete</button></td>
              </tr>)
          }
        </tbody>
      </table> 

        </div>
        
    )
}

