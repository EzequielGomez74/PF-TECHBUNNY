import './App.css';
import { Route, Switch } from 'react-router-dom';
import Details from './Components/Details/Details'
import CardV from './Components/Card V/CardV';
import CardH from './Components/Card H/CardH';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import LandingPage from './Components/Landing/LandingPage';
import Category from './Components/Category/Category';



function App() {
  return (
    <div className="App">

      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path='/home' component={Home}  />
        <Route exact path='/detail/:id' component={Details}  />
        <Route exact path='/about' component={About}  />

        <Route exact path='/category/:name' component={Category}/>
      </Switch>


      <div>
        <CardV></CardV>
        <CardH></CardH>
      </div>


      <header className="App-header">

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default App;