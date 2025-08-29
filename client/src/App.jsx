import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./modules/Layout/Navbar";
import Homesection from "./modules/Routes/Homesection";
import Footer from "./modules/Pages/Footer";
import { Buy } from "./modules/Pages/Buy/Buy";
import { PropertyDetails } from "./modules/auth/PropertyDetails";
import Uploadsection from "./modules/Admin/Uploadsection";
import { ScrollToTop } from "./modules/ScrollToTop";
import { Sell } from "./modules/Pages/Sell/Sell";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout />
    </Router>
  );
}

function Layout() {
  const location = useLocation();
  const hideFooter = location.pathname === "/admin";

  return (
    <>
      {!hideFooter && <Header />}
      <Routes>
        <Route path="/" element={<Homesection />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/buy/:id" element={<PropertyDetails />} />
        <Route path="/sell/:id" element={<PropertyDetails />} />
        <Route path="/sell" element={<Sell />} />
        <Route
          path="/business-deal"
          element={<h1 className="p-10">Business Deal Page</h1>}
        />
        <Route path="/admin" element={<Uploadsection />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  );
}

export default App;
