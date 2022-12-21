
import './App.css';
import Footer from './Components/Footer/Footer';
import NavBar from './Components/NavBar/NavBar';
import AboutUs from './Components/About/index';


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