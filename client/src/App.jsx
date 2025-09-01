import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./modules/Layout/Navbar";
import Homesection from "./modules/Routes/Homesection";
import { Buy } from "./modules/Pages/Buy/Buy";
import { PropertyDetails } from "./modules/auth/PropertyDetails";
import Uploadsection from "./modules/Admin/Uploadsection";
import { ScrollToTop } from "./modules/ScrollToTop";
import { Sell } from "./modules/Pages/Sell/Sell";
import ScrollToTopButton from "./modules/Layout/ScrollToTopButton";
import { BusinessDeal } from "./modules/Pages/BusinessDeal/BusinessDeal";
import EnquiryForm from "./modules/Layout/Enquiryform";
import Footersection from "./modules/Pages/Footer";

function App() {
  return (
    <Router>
      <ScrollToTopButton/>
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
     <Header />
      <Routes>
        <Route path="/" element={<Homesection />} />
        <Route path="/buy" element={<Buy />} />
        <Route path="/buy/:id" element={<PropertyDetails />} />
        <Route path="/sell/:id" element={<PropertyDetails />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/business-deal" element={<BusinessDeal/>}/>
        <Route path="/admin" element={<Uploadsection />} />
        <Route path="/make-schedule" element={<EnquiryForm />} />
      </Routes>
      {/* {!hideFooter && <Footer />} */}
 <Footersection />
    </>
  );
}

export default App;
