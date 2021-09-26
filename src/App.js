import './App.css';
import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component = {ChatPage}/>
        <Route exact path="/login" component = {LoginPage}/>
        <Route exact path="/register" component = {RegisterPage}/>       
      </Switch>
    </Router>
  );
}

export default App;
