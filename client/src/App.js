import './App.css';
import { Route, Switch } from 'react-router-dom';
import Details from './Components/Details/Details'
import Home from './Components/Home/Home';
import About from './Components/About/About';
import LandingPage from './Components/Landing/LandingPage';
import Category from './Components/Category/Category';
import Favoritos from './Components/Favoritos/Favoritos';
import Cart from './Components/Cart/Cart';
import Error from './Components/Error/Error';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path='/home' component={Home}  />
        <Route exact path='/detail/:id' component={Details}  />
        <Route exact path='/about' component={About}  />
        <Route exact path='/favorites' component={Favoritos}  />
        <Route exact path='/cart' component={Cart}  />
        <Route exact path='/category/:name' component={Category}/>
        <Route exact path='*' component={Error}/>
      </Switch>


      <div>
        <CardV></CardV>
        <CardH></CardH>
      </div>

      <NavBar />

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      <Footer />

    </div>
  );
}

export default App;