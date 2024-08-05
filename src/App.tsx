import './App.css';
import Container from './pages/container';
import { TodoProvider } from './context/todoContext';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <body>
      <TodoProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Container />}/>
            <Route path='/check' element={<h1>Check complete!</h1>}/>
          </Routes>
        </Router>
      </TodoProvider>
    </body>
  );
}

export default App;
