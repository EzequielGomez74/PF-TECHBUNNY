import './App.css';
<<<<<<< HEAD
import CardV from './Components/Card V/CardV';
import CardH from './Components/Card H/CardH';
import Footer from './Components/Footer/Footer';
import NavBar from './Components/NavBar/NavBar';
import Newsletter from './Components/NewsLetter/Newsletter';
=======
import { Route, Switch } from 'react-router-dom';
import Details from './Components/Details/Details'
// import CardV from './Components/Card V/CardV';
// import CardH from './Components/Card H/CardH';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import LandingPage from './Components/Landing/LandingPage';
>>>>>>> a53434b3716cd655b308b52864c0b7c4f263fd33


function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      <NavBar />
        <CardV/>
        <CardH/>
       <Newsletter/>
      {/* <Footer /> */}
=======
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path='/home' component={Home}  />
        <Route exact path='/detail/:id' component={Details}  />
        <Route exact path='/about' component={About}  />
        <Route exact path='/category/:name' component={Category}/>
      </Switch>
>>>>>>> a53434b3716cd655b308b52864c0b7c4f263fd33
    </div>
  );
}

export default App;