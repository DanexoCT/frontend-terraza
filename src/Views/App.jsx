import { BrowserRouter as Router } from 'react-router-dom'; import '../css/App.css';
import Navbar from '../components/Navbar';
import Main from './Main';
import { AuthProvider } from '../services/AuthContext';

function App() {
  return (
    <AuthProvider> {/* Envuelve tu app en el AuthProvider */}
      <Router>
        <Navbar /> {/* Navbar cambia según el estado de autenticación */}
        <Main />
      </Router>
    </AuthProvider>
  );
}

export default App;
