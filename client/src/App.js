import "./App.css";
import { Route, Switch } from "react-router-dom";
import Details from "./Components/Details/Details";
// import CardV from './Components/Card V/CardV';
// import CardH from './Components/Card H/CardH';
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import LandingPage from "./Components/Landing/LandingPage";
import Category from "./Components/Category/Category";
import Favoritos from "./Components/Favoritos/Favoritos";
import Cart from "./Components/Cart/Cart";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:id" component={Details} />
        <Route exact path="/about" component={About} />
        <Route exact path="/favorites" component={Favoritos} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/category/:name" component={Category} />
      </Switch>
    </div>
  );
}

export default App;
