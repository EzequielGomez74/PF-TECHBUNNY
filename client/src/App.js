import "./App.css";
import { Route, Switch } from "react-router-dom";
import Details from "./Components/Details/Details";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import LandingPage from "./Components/Landing/LandingPage";
import Category from "./Components/Category/Category";
import Favoritos from "./Components/Favoritos/Favoritos";
import Cart from "./Components/Cart/Cart";
import FollowUp from "./Components/Estado de Orden/FollowUp";
import Error from "./Components/Error/Error";
import Login from "./Components/Login/Login";
import Verify from "./Components/Verify/Verify";
import Register from "./Components/Register/Register";
import Categories from "./Components/Categories/Categories";
import QA from "./Components/QA/QA";
import Payment from "./Components/Payment/Payment";
import axios from "axios";
import Profile from "./Components/Profile/Profile";
import EditProfile from "./Components/Profile/EditProfile";
import Feedback from "./Components/Feedback/Feedback";
import NewPassword from "./Components/NewPassword/NewPassword";
import Recover from "./Components/Recover/Recover";
import Results from "./Components/Results/Results";
import Brand from "./Components/Brand/Brand";
import Products from "./Components/Dashboard (admin)/Products/Products";
import Users from "./Components/Dashboard (admin)/Users/Users";
import Orders from "./Components/Dashboard (admin)/Orders/Orders";
import Statistics from "./Components/Dashboard (admin)/Statistics/Statistics";
import Status from "./Components/Estado de Orden/Status";

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/editProfile" component={EditProfile} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/detail/:id" component={Details} />
        <Route exact path="/about" component={About} />
        <Route exact path="/favorites" component={Favoritos} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/categories" component={Categories} />
        <Route exact path="/category/:name" component={Category} />
        <Route exact path="/brand/:brand" component={Brand} />
        <Route exact path="/followUp" component={FollowUp} />
        <Route exact path="/followUp/:userId/:orderId" component={Status} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/qa" component={QA} />
        <Route exact path="/results/:searchTerm" component={Results} />
        <Route exact path="/recover" component={Recover} />
        <Route exact path="/newPassword/:token" component={NewPassword} />
        <Route exact path="/verify/:token" component={Verify} />
        <Route exact path="/feedback" component={Feedback} />
        <Route exact path="/dashboard/products" component={Products} />
        <Route exact path="/dashboard/users" component={Users} />
        <Route exact path="/dashboard/orders" component={Orders} />
        <Route exact path="/dashboard" component={Statistics} />
        <Route exact path="*" component={Error} />
      </Switch>
    </div>
  );
}

export default App;
