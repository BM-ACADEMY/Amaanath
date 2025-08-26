import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./modules/Layout/Navbar";
import Homesection from "./modules/Routes/Homesection";
import Footer from "./modules/Pages/Footer";
import { Buy } from "./modules/Pages/Buy/Buy";


function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Homesection/>} />
        <Route path="/buy" element={<Buy/>} />
        <Route path="/sell" element={<h1 className="p-10">Sell Page</h1>} />
        <Route path="/business-deal" element={<h1 className="p-10">Business Deal Page</h1>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
