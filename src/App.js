import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { createContext, useState } from 'react';

export const HomeContext = createContext(null);

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("authentication"));

  function handleSetToken(token = '') {
    if(token) {
      localStorage.setItem("authentication", token);
    }else {
      localStorage.removeItem("authentication");
    }

    setToken(token)
  }

  return (
    <Router>
      <Switch>
        <HomeContext.Provider value={{ token, handleSetToken }}>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute path="/login" isAuth component={Login}/>
          <ProtectedRoute path="/register" isAuth component={Register}/>
        </HomeContext.Provider>
      </Switch>
    </Router>   
  );
}     

export default App;