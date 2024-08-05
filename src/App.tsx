import './App.css';
import Container from './pages/container';
import { TodoProvider } from './context/todoContext';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/login';

function App() {

  return (
    <body>
      <TodoProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Container />}/>
            <Route path='/login' element={<Login />}/>
          </Routes>
        </Router>
      </TodoProvider>
    </body>
  );
}

export default App;
