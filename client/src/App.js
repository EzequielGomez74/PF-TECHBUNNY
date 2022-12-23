import logo from './logo.svg';
import './App.css';
import CardV from './Components/Card V/CardV';
import CardH from './Components/Card H/CardH';
import Footer from './Components/Footer/Footer';
import NavBar from './Components/NavBar/NavBar';
import Newsletter from './Components/NewsLetter/Newsletter';


function App() {
  return (
    <div className="App">


      


      <NavBar />

      
        <CardV/>
        <CardH/>
       <Newsletter/>
      {/* <Footer /> */}
    </div>
  );
}

export default App;