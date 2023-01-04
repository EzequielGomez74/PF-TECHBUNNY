import "./App.css";
import { Route, Switch } from "react-router-dom";
import Details from "./Components/Details/Details";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import LandingPage from "./Components/Landing/LandingPage";
import Category from "./Components/Category/Category";
import Categories from "./Components/Categories/Categories";
import Favoritos from "./Components/Favoritos/Favoritos";
import Cart from "./Components/Cart/Cart";
import FollowUp from "./Components/Estado de Orden/FollowUp";
import Error from "./Components/Error/Error";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
<<<<<<< HEAD
//asd
=======
import Categories from "./Components/Categories/Categories";

>>>>>>> fdf4d407383cdabab393c3615932d12381e54a8f
function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:id" component={Details} />
        <Route exact path="/about" component={About} />
        <Route exact path="/favorites" component={Favoritos} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/category/:name" component={Category} />
        <Route exact path="/followUp" component={FollowUp} />
        <Route exact path="*" component={Error} />
<<<<<<< HEAD
=======
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:id" component={Details} />
        <Route exact path="/about" component={About} />
        <Route exact path="/favorites" component={Favoritos} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/category/:name" component={Category} />
        <Route exact path="/followUp" component={FollowUp} />
        <Route exact path="*" component={Error} />
>>>>>>> fdf4d407383cdabab393c3615932d12381e54a8f
      </Switch>
    </div>
  );
}
//asd
export default App;
