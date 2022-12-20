
import './App.css';
import { Route, Switch } from 'react-router-dom';
// import CardV from './Components/Card V/CardV';
// import CardH from './Components/Card H/CardH';
import Home from './Components/Home/Home';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/home' component={Home}  />
      </Switch>
    </div>
  );
}

export default App;