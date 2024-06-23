import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './Components/CreateTodo'

function App() {
  
  return (
    <div style={{ backgroundColor: '#f9f9f9' }}>
      <center>
        <h1>TODO APP</h1>
      </center>
      <CreateTodo></CreateTodo>
    </div>
  )
}

export default App