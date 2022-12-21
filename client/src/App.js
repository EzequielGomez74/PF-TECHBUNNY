import './App.css';
import { Route, Switch } from 'react-router-dom';
import Details from './Components/Details/Details'
// import CardV from './Components/Card V/CardV';
// import CardH from './Components/Card H/CardH';
import Home from './Components/Home/Home';
import About from './Components/About/About';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/home' component={Home}  />
        <Route exact path='/detail/:id' component={Details}  />
        <Route exact path='/about' component={About}  />
      </Switch>
    </div>
  );
}

export default App;