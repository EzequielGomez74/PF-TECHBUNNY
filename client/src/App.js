
import './App.css';
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