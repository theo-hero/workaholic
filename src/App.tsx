import './styles/App.scss';
import Container from './pages/container';
import { TodoProvider } from './context/todoContext';
import { DataProvider } from './context/databaseContext';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Navbar from './components/navbar';
import Account from './pages/my-account';

function App() {

  return (
    <main>
      <DataProvider><TodoProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Container />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/account' element={<Account />}/>
          </Routes>
        </Router>
      </TodoProvider></DataProvider>
    </main>
  );
}

export default App;
