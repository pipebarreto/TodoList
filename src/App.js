import React, {useState, useRef} from 'react';
import './App.css';
import { AgGridReact} from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import DateFnsUtils from '@date-io/date-fns'; 
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import TextField from'@mui/material/TextField';
import Button from'@mui/material/Button';
import Stack from'@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';



function App() {

  const [todo, setTodo] = useState({description: '', date: '', priority:''});
  const [todos, setTodos] = useState([]);
  const [selectedDate, handleDateChange] = useState(new Date());

  const [page, setPage] = useState('Todos');

  const handleChange = (event, page) => {  setPage(page);};
  
  const gridRef = useRef();
  
  const columns = [  { field: "description", sortable:true, filter: true  }, 
   { field: "date", sortable:true, filter: true }, 
   { field: "priority", sortable:true, filter: true,
    cellStyle: params => params.value === "High"|| params.value === "high"? 
    {color:'red'}:{color:'black'}}]

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

 const addTodo = (event) => {
   event.preventDefault();
    setTodos([todo, ...todos]);
    setTodo({description: '', date: '', priority:''});
  }

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
          setTodos(todos.filter((todo, index) =>    
            index !== gridRef.current.getSelectedNodes()[0].childIndex))  }
          else
        {alert('Select row first');  }
    }
  
    const clear = () => {
      setTodos([]);
      }
  

  return (
    <div className="App">

<Tabs value={page} onChange={handleChange}>
<Tab value="Home" label="HOME" />
<Tab value="Todos" label="TODOS" />
</Tabs>
{page === 'Home' && <div>Welcome!!!</div> }
{page === 'Todos' && <div>


<Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
      <TextField
      variant="standard"
      label='Description'
      name ="description"
      onChange={inputChanged}
      value={todo.description}/>


<MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
      variant="standard"
      onChange={date => handleDateChange(date)}
      label='Date'
      name ="date"
      value={todo.date = selectedDate.toISOString().substring(0, 10)} 
     />

  </MuiPickersUtilsProvider>

<TextField
      variant="standard"
      label='Priority'
      name ="priority"
      onChange={inputChanged}
      value={todo.priority}/>

      <Button onClick={addTodo}
      endIcon ={<AddIcon />}
      variant="contained"
      >Add</Button>

      <Button onClick={deleteTodo}
      variant="contained"
      endIcon ={<DeleteIcon />}
      color="error">Delete</Button>

      <Button onClick={clear}
      variant="contained"
      color="warning">Clear Table</Button>

    </Stack>

      <div className="ag-theme-material"style=
          {{height: '700px',
          width: '70%',
          margin: 'auto',
        }}
           >
         <AgGridReact 
          ref={gridRef} 
          onGridReady={ params => gridRef.current = params.api } 
          rowSelection="single" 
          columnDefs={columns} 
          rowData={todos}>
           </AgGridReact>
       </div>   
      </div>}
    </div>
  );
}

export default App;
